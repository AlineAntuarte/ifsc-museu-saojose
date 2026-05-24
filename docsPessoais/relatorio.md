# Relatório de Infraestrutura e Diagnóstico Técnico

## Informações do Projeto

* **Projeto:** Landing Page Interativa do Museu Histórico de São José
* **Instituição:** Instituto Federal de Santa Catarina (IFSC)
* **Desenvolvedora:** Aline Barbosa Antuarte
* **Ambiente de Desenvolvimento:** Windows 11, Node.js, Docker Desktop, Prisma ORM, MySQL

---

## 1. Estado Inicial do Projeto (Como foi Encontrado)

O projeto foi recebido como uma herança de código legada de semestres anteriores. A aplicação foi construída utilizando o framework Next.js (App Router), TypeScript, Tailwind CSS, Three.js para o tour 3D e Prisma ORM acoplado a um banco de dados relacional MySQL.

No primeiro momento de execução local, a aplicação apresentou falhas críticas de infraestrutura:

* **Erro HTTP 500 (Internal Server Error):** Disparado nas rotas de API internas (como `/api/acervo` e `getCarouselData`), impossibilitando a renderização dinâmica da página.
* **Ausência de Banco de Dados Ativo:** O Prisma tentava inicializar a conexão cliente, mas falhava por falta de um servidor MySQL local configurado e ativo.
* **Variáveis de Ambiente Incompletas:** O arquivo `.env` essencial não estava presente na raiz do projeto, contendo apenas o modelo `.env.example`.

---

## 2. Desafios de Infraestrutura Encontrados

Durante o processo de mitigação de erros, quatro grandes barreiras técnicas foram identificadas e isoladas:

### 2.1. Conflito de Tipos Nativos (Tentativa de Migração para SQLite)

Visando contornar a falta de um banco MySQL local, tentou-se migrar temporariamente o provedor do Prisma para `sqlite`. Isso disparou o erro de validação **P1012**:

```text
error: Native type Text is not supported for sqlite connector.
error: Native type LongText is not supported for sqlite connector.

```

O esquema original utilizava annotations específicas do MySQL (`@db.Text` e `@db.LongText`). O SQLite não oferece suporte nativo a esses modificadores de tipo, o que causaria quebras estruturais no banco e divergências graves com o repositório principal de produção.

### 2.2. Bloqueio de Provedor por Histórico de Migrações

Após tentar limpar as tabelas, o Prisma CLI barrou a mudança através do erro **P3019**:

```text
The datasource provider `sqlite` specified in your schema does not match the one specified in the migration_lock.toml, `mysql`.

```

O histórico de migrações (`prisma/migrations`) estava travado em MySQL. Alterar o banco local exigiria deletar o histórico de desenvolvimento compartilhado, o que foi descartado para preservar a integridade do repositório legada. **Decisão técnica:** Manter a arquitetura original em MySQL via containerização.

### 2.3. Ausência de Redes Externas no Docker (Windows Engine)

Ao tentar subir a stack oficial através do Docker Compose, a inicialização falhou com o erro:

```text
network museu_network declared as external, but could not be found

```

O arquivo `docker-compose.yml` especificava uma rede isolada de comunicação (`museu_network`) configurada como externa. Como o ambiente Windows estava zerado, a rede não existia no escopo do Docker Host.

### 2.4. Falha na Interpolação de Variáveis do Docker no Windows

O MySQL falhava ao iniciar (`my_mysql_site`), morrendo silenciosamente logo após o boot. O comando `docker logs` revelou a causa raiz:

```text
[ERROR] [Entrypoint]: Database is uninitialized and password option is not specified

```

No ambiente Windows, o Docker Compose falhou ao ler e interpolar dinamicamente as variáveis contidas no arquivo `.env` para o escopo do container do MySQL, resultando no envio de strings vazias para parâmetros obrigatórios como `MYSQL_ROOT_PASSWORD`. Além disso, o caractere de quebra de linha do Windows causou uma leitura truncada, mesclando strings de conexão (`database_museu%22JWT_SECRET=...`).

---

## 3. Soluções Aplicadas e Linha do Tempo de Correções

Para restabelecer o projeto sem descaracterizar a arquitetura planejada pela equipe anterior, adotou-se a estratégia de correção por isolamento de infraestrutura:

1. **Restauração do Ambiente Git:** O repositório foi clonado novamente para limpar alterações experimentais e garantir o retorno ao estado MySQL original.
2. **Criação Manual da Rede Docker:** Criou-se a malha de rede exigida pelo ecossistema através do comando CLI do Docker.
3. **Refatoração do Docker Compose (Hardcoding Seguro):** Editou-se o arquivo `docker-compose.yml` na definição do serviço `mysql`. Os valores das variáveis de ambiente obrigatórias foram inseridos de forma literal (*chumbados*), eliminando a dependência de leitura do arquivo `.env` pelo motor do Docker no Windows:

```yaml
environment:
  MYSQL_ROOT_PASSWORD: password
  MYSQL_DATABASE: database_museu
  MYSQL_USER: admin
  MYSQL_PASSWORD: password

```

1. **Isolamento de Arquivos de Lock:** O arquivo concorrente `yarn.lock` foi removido, centralizando a gerência de dependências estritamente sob o pacote `package-lock.json` do NPM.
2. **Sincronização Direta de Tabelas (Prisma DB Push):** Em vez de executar migrações históricas complexas que poderiam falhar por falta de dados preexistentes, utilizou-se o espelhamento direto de entidades. O comando enviou a estrutura do `schema.prisma` diretamente para o container MySQL ativo no Docker, criando o banco `database_museu` em 1.34 segundos.

---

## 4. Guia de Operação e Comandos de Sobrevivência

Este bloco serve como documentação de rotina para manter o ambiente estável e funcional a partir de agora.

### 4.1. Inicialização da Infraestrutura (Ordem Correta)

Com o Docker Desktop aberto no Windows, execute os comandos nesta sequência dentro da pasta raiz:

```bash
# 1. Garantir que a rede do ecossistema existe
docker network create museu_network

# 2. Subir os containers do App e do MySQL em segundo plano
docker compose up -d

# 3. Validar se ambos os containers estão ativos (Up)
docker ps

```

### 4.2. Sincronização do Banco de Dados

Sempre que o banco for resetado ou o arquivo `schema.prisma` sofrer atualizações:

```bash
# Instalar dependências ignorando scripts perigosos
npm install --ignore-scripts

# Gerar o cliente de tipagem do Prisma
npx prisma generate

# Sincronizar as tabelas com o MySQL do Docker
npx prisma db push

```

### 4.3. Execução do Projeto

Para rodar o servidor de desenvolvimento local com hot-reload ativo:

```bash
npm run dev

```

A aplicação estará disponível em: `http://localhost:3000`

---

## 5. Próximos Passos Estipulados

Com a camada de dados (MySQL) e o servidor back-end operando sem falhas (fim dos erros 500), o foco do desenvolvimento mudará para as seguintes metas:

1. **População de Dados de Teste:** Criação de usuários administradores via script Node.js usando o hash criptográfico `bcryptjs` para acesso seguro ao painel administrativo.
2. **Automação da Galeria Estática:** Desenvolvimento de um script em Python para ler, manipular e atualizar de forma automática o arquivo JSON de backup localizado em `public/data/gallery.json`.
3. **Mapeamento de Mídias:** Garantir que o upload de imagens físicas via dashboard administrativo salve os arquivos no caminho estático correto (`public/imgs/imagens/`) para que o front-end consiga renderizar os artefatos históricos do acervo sem quebras de links.

---
