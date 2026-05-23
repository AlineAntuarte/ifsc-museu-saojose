# 📋 Commit Semântico - Guia Prático

Um guia rápido para entender e usar **commit semântico** no seu repositório Git.

---

## 🎯 O que é?

Commit semântico é uma forma **padronizada** e **organizada** de escrever mensagens de commit. Facilita entender o histórico do projeto e automatizar processos.

---

## 📐 Formato Padrão

```txt
<tipo>: <descrição>

<corpo opcional>
<rodapé opcional>
```

### Exemplo Simples

```bash
git commit -m "feat: adicionar função de validação"
```

### Exemplo Completo

```bash
git commit -m "fix: corrigir erro em cálculo de idade

O cálculo estava subtraindo um ano a mais do que deveria.
Refatorei a lógica para considerar o mês e dia corretos.

Fixes #123"
```

---

## 🏷️ Tipos de Commit

### `feat:` 🚀 Nova Funcionalidade

Use quando **adiciona** uma funcionalidade nova.

```bash
git commit -m "feat: criar função para calcular IMC"
git commit -m "feat: adicionar validação de email"
git commit -m "feat: implementar sistema de login"
```

---

### `fix:` 🐛 Correção de Bug

Use quando **corrige** um problema/erro.

```bash
git commit -m "fix: corrigir bug no cálculo de desconto"
git commit -m "fix: resolver erro ao enviar formulário"
git commit -m "fix: corrigir overflow no menu mobile"
```

---

### `docs:` 📖 Documentação

Use quando **modifica** documentação (README, comentários, etc.).

```bash
git commit -m "docs: adicionar exemplos de uso"
git commit -m "docs: melhorar explicação de funcções"
git commit -m "docs: criar guia de contribuição"
```

---

### `style:` 🎨 Formatação

Use para **mudanças de código que não afetam funcionalidade** (espaçamento, indentação, ponto-e-vírgula).

```bash
git commit -m "style: ajustar indentação do arquivo"
git commit -m "style: formatar código com prettier"
git commit -m "style: adicionar ponto-e-vírgula faltante"
```

---

### `refactor:` 🔧 Refatoração

Use quando **muda a estrutura** sem adicionar função ou corrigir bug.

```bash
git commit -m "refactor: reorganizar código de validação"
git commit -m "refactor: simplificar lógica de filtragem"
git commit -m "refactor: extrair função reutilizável"
```

---

### `perf:` ⚡ Performance

Use quando **melhora performance**.

```bash
git commit -m "perf: otimizar algoritmo de busca"
git commit -m "perf: reduzir tamanho do bundle"
git commit -m "perf: melhorar velocidade de carregamento"
```

---

### `test:` ✅ Testes

Use quando **adiciona ou modifica testes**.

```bash
git commit -m "test: adicionar testes unitários"
git commit -m "test: aumentar cobertura de testes"
git commit -m "test: corrigir testes falhando"
```

---

### `build:` 🏗️ Build/Dependências

Use para **mudanças em sistema de build, dependências**.

```bash
git commit -m "build: atualizar webpack"
git commit -m "build: instalar nova dependência"
git commit -m "build: configurar variáveis de ambiente"
```

---

### `ci:` 🔄 Integração Contínua

Use para **mudanças em CI/CD** (GitHub Actions, etc.).

```bash
git commit -m "ci: adicionar workflow de testes"
git commit -m "ci: configurar deploy automático"
```

---

### `chore:` 📦 Tarefas

Use para **tarefas gerais** que não se encaixam em nenhuma categoria.

```bash
git commit -m "chore: atualizar gitignore"
git commit -m "chore: remover arquivos antigos"
git commit -m "chore: adicionar dependência de desenvolvimento"
```

---

## 💬 Descrição (Essencial!)

Sempre explique o **que** e **por que** em poucas palavras.

### ✅ Bom

```bash
git commit -m "feat: adicionar validação de email no formulário"
```

### ❌ Ruim

```bash
git commit -m "feat: mudanças"
git commit -m "feat: novo arquivo"
git commit -m "feat: arrumei uns negócios"
```

---

## 📝 Dicas de Descrição

1. **Use a segunda pessoa do imperativo**: "adicionar", "corrigir", "implementar" (não "adiciona", "corrigiu")

2. **Comece com verbo**: "adicionar", "remover", "melhorar", "criar"

3. **Seja específico**: Diga o que você fez, não apenas "mudanças"

4. **Não termina com ponto**: "feat: adicionar função X" (sem ponto final)

5. **Descreva a mudança**: "feat: adicionar validação de CPF no cadastro" (melhor que "feat: validação")

---

## 💡 Corpo (Opcional)

Se a mudança é complexa, adicione detalhes. Separado da descrição por linha em branco.

```bash
git commit -m "fix: corrigir cálculo de idade

O cálculo anterior não considerava corretamente meses
e dias do ano. Refatorei usando a biblioteca date-fns
para maior precisão e legibilidade."
```

---

## 🔗 Rodapé (Opcional)

Use para **referenciar issues** que foram resolvidas.

```bash
git commit -m "fix: corrigir validação de email

Fixes #42"
```

```bash
git commit -m "feat: implementar autenticação

Closes #15, Closes #18"
```

---

## 🚀 Exemplos Práticos do Seu Curso

### Aprendendo Arrays

```bash
git commit -m "feat: criar exemplo de push e pop em arrays"
```

### Corrigindo Exercício

```bash
git commit -m "fix: corrigir exercício 3 de contagem"
```

### Adicionando Documentação

```bash
git commit -m "docs: melhorar explicação de closures"
```

### Reorganizando Código

```bash
git commit -m "refactor: separar exemplos de funções em arquivo específico"
```

### Novo Projeto

```bash
git commit -m "feat: criar projeto de todo list interativa"
```

---

## 📋 Checklist de Commit

Antes de fazer commit, pergunte-se:

- [ ] Qual é a **mudança principal**? (feature, fix, docs, etc.)
- [ ] Consigo descrever em **poucas palavras**?
- [ ] A descrição é **clara e específica**?
- [ ] Usei **imperativo** (adicionar, corrigir, criar)?
- [ ] O código está **testado**?
- [ ] O commit é **atômico** (uma mudança lógica)?

---

## 🔄 Fluxo Completo

### 1. Faça suas mudanças

```bash
# Editar arquivos...
```

### 2. Veja o status

```bash
git status
```

### 3. Adicione as mudanças

```bash
git add arquivo.js
# ou todos
git add .
```

### 4. Faça o commit semântico

```bash
git commit -m "feat: adicionar validação de formulário"
```

### 5. Envie para o repositório

```bash
git push
```

---

## 🎨 Exemplos por Contexto

### Estudando JavaScript

```bash
# Adicionando novo exemplo
git commit -m "feat: adicionar exemplo de arrow functions"

# Corrigindo exercício
git commit -m "fix: corrigir lógica de contagem de pares"

# Melhorando documentação da aula
git commit -m "docs: detalhar funcionamento de closures"

# Reorganizando pasta de exemplos
git commit -m "refactor: reorganizar exemplos por dificuldade"

# Criando novo projeto prático
git commit -m "feat: criar projeto calculadora interativa"
```

---

## 📊 Benefícios de Usar Semântico

✅ **Histórico limpo e legível**  
✅ **Facilita encontrar quando algo quebrou**  
✅ **Automatiza versionamento e release notes**  
✅ **Melhora colaboração em equipe**  
✅ **Profissionalismo no código**

---

## 🛠️ Configurar Editor Padrão (Opcional)

Para escrever mensagens maiores, configure seu editor:

```bash
git config --global core.editor "code --wait"
```

Aí você pode fazer:

```bash
git commit
# Abre VS Code para digitar mensagem maior
```

---

## ⚠️ Erros Comuns

### ❌ Múltiplas mudanças em um commit

```bash
git commit -m "feat: adicionar validação, corrigir bug e melhorar docs"
```

**Melhor:** Fazer commits separados para cada mudança

### ❌ Mensagem vaga

```bash
git commit -m "fix: arrumei"
```

**Melhor:** `git commit -m "fix: corrigir validação de email"`

### ❌ Sem tipo

```bash
git commit -m "adicionar novo exemplo"
```

**Melhor:** `git commit -m "feat: adicionar novo exemplo"`

---

## 🎓 Resumo Rápido

| Tipo        | Quando usar         | Exemplo                           |
|-------------|---------------------|-----------------------------------|
| `feat:`     | Funcionalidade nova | `feat: criar função saudacao`     |
| `fix:`      | Corrigir bug        | `fix: corrigir cálculo`           |
| `docs:`     | Documentação        | `docs: atualizar README`          |
| `style:`    | Formatação          | `style: ajustar indentação`       |
| `refactor:` | Reorganizar         | `refactor: simplificar lógica`    |
| `perf:`     | Performance         | `perf: otimizar loop`             |
| `test:`     | Testes              | `test: adicionar testes`          |
| `build:`    | Build/deps          | `build: atualizar package.json`   |
| `ci:`       | CI/CD               | `ci: configurar GitHub Actions`   |
| `chore:`    | Tarefas gerais      | `chore: atualizar .gitignore`     |

---

## 🎯 Pronto para Usar

Agora você está pronto para fazer commits **semânticos, claros e profissionais**! 🚀

Lembre-se: Um histórico bem organizado é um presente para você mesmo do futuro.

---

**Dica Final:** Veja o histórico bonito com:

```bash
git log --oneline
```

Verá algo como:

```bash
a1b2c3d feat: adicionar validação de email
d4e5f6g fix: corrigir cálculo de IMC
h7i8j9k docs: melhorar guia de uso
```

Bem mais legal que:

```bash
a1b2c3d mudanças
d4e5f6g mais mudanças
h7i8j9k arrumei tudo
```

Feliz committing! 🎉
