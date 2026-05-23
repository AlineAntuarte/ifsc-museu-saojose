# Guia Rápido de Comandos Git

Este é um guia de referência para os comandos mais comuns do Git, desde a configuração inicial até operações mais avançadas como o trabalho com branches.

## 1\. ⚙️ Configuração Inicial (Apenas uma vez)

Antes de começar, configure seu nome de usuário e e-mail. Essas informações serão associadas a todos os *commits* que você criar.

```bash
git config --global user.name "AlineAntuarte"
git config --global user.email "aline.ba@aluno.ifsc.edu.br"
```

> **Dica:** Para evitar digitar sua senha a cada `push`, você pode armazená-la em cache temporariamente.
>
> Salva as credenciais em cache por 4 horas (14400 segundos)
>
> ```bash
> git config --global credential.helper 'cache --timeout=14400'
> ```

-----

## 2\. 📂 Criar ou Obter um Repositório

Você pode iniciar um novo repositório do zero ou clonar um já existente.

* **Inicializar um repositório local:**

    ```bash
    git init
    ```

* **Clonar um repositório remoto:**

    ```bash
    git clone <url-do-repositorio>
    ```

-----

## 3\. 💻 Ciclo de Trabalho Básico

O fluxo de trabalho diário envolve verificar o estado, adicionar arquivos e confirmar suas alterações.

* **Verificar o status:**
  * `git status`: Mostra quais arquivos foram modificados, quais estão na área de preparação (*stage*) e quais não estão sendo rastreados.
* **Analisar as alterações:**
  * `git diff`: Exibe as diferenças exatas no conteúdo dos arquivos modificados.

### Preparar (Stage) e Confirmar (Commit)

Depois de fazer as alterações, você precisa adicioná-las à área de preparação e, em seguida, confirmá-las com uma mensagem descritiva.

* **Adicionar arquivos ao *stage***:
  * `git add <nome-do-arquivo>`: Adiciona um arquivo específico.
  * `git add .`: Adiciona **todos** os arquivos modificados no diretório atual e subdiretórios.
* **Confirmar as alterações**:
  * `git commit -m "Uma mensagem clara e descritiva"`: Salva o *snapshot* dos arquivos preparados no histórico do projeto.

-----

## 4\. 🔄 Sincronizar com o Repositório Remoto

Mantenha seu repositório local atualizado com o remoto e envie suas próprias alterações.

* `git pull origin main`: Busca as alterações do repositório remoto (`origin`) na branch `main` e as mescla com sua branch local.
* `git push -u origin main`: Envia seus *commits* para a branch `main` remota. A flag `-u` cria um vínculo (*tracking*) entre a branch local e a remota na primeira vez.
* `git push`: Em `pushes` futuros, este comando já será suficiente.

-----

## 5\. 🌿 Trabalhar com Branches

Branches permitem que você desenvolva funcionalidades isoladamente sem afetar a linha principal de desenvolvimento (`main`).

* **Listar branches:**
  * `git branch`: Mostra todas as branches locais. O `*` indica a branch em que você está.
* **Criar e mudar de branch:**
  * `git checkout -b <nome-da-nova-branch>`: Cria uma nova branch e muda para ela instantaneamente.
* **Mudar para uma branch existente:**
  * `git checkout <nome-da-branch>`
* **Mesclar branches:**
  * `git merge <nome-da-branch>`: Incorpora as alterações de outra branch na sua branch atual.
* **Excluir branches:**
  * `git branch -d <nome-da-branch>`: Apaga a branch localmente (após ter sido mesclada).
  * `git push origin --delete <nome-da-branch>`: Apaga a branch no repositório remoto.

-----

## 6\. ⏪ Desfazer e Guardar Alterações

Cometeu um erro ou precisa pausar seu trabalho? O Git oferece várias ferramentas para isso.

| Comando | Descrição |
| :--- | :--- |
| `git reset HEAD <arquivo>` | Tira um arquivo da área de preparação (*stage*), mas mantém as modificações. |
| `git checkout -- <arquivo>` | **Descarta permanentemente** as alterações em um arquivo, revertendo-o para a versão do último *commit*. |
| `git reset --hard` | **CUIDADO:** Reverte **todos** os arquivos para o estado do último *commit*, descartando quaisquer alterações locais. |
| `git revert <hash-do-commit>` | Cria um novo *commit* que desfaz as alterações de um *commit* anterior, mantendo o histórico intacto. |
| `git stash` | Guarda temporariamente suas alterações não comitadas para que você possa mudar de branch. |
| `git stash pop` | Aplica as últimas alterações guardadas com `stash` e as remove da lista de *stashes*. |
