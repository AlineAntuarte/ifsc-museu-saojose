# 📘 Documentação Completa: TypeScript

## 🧠 O que é TypeScript?

TypeScript é um superconjunto do JavaScript criado pela Microsoft que adiciona **tipagem estática**. Isso significa que você pode declarar os tipos das variáveis, argumentos e retornos das funções.

### Exemplo básico:

```ts
function soma(a: number, b: number): number {
  return a + b;
}
```

Esse código garante que `a` e `b` sejam números, evitando bugs comuns.

---

## 🛠️ Como funciona?

- Arquivos `.ts` (ou `.tsx` com React)
- Compilados para `.js` com `tsc` (TypeScript Compiler)
- Tipagem só é verificada em tempo de desenvolvimento

---

## 🚀 Criando um projeto TypeScript

```bash
npm init -y
npm install typescript --save-dev
npx tsc --init
```

Escreva seus arquivos `.ts` e compile com:

```bash
npx tsc
```

---

## 🔧 Recursos principais

### ✅ Tipagem Estática

```ts
let nome: string = "Nicolas";
let idade: number = 20;
```

### ✅ Inferência de Tipos

```ts
let ativo = true; // TypeScript sabe que isso é um boolean
```

### ✅ Interfaces e Tipos

```ts
interface Usuario {
  nome: string;
  idade: number;
}
```

### ✅ Generics

```ts
function identidade<T>(valor: T): T {
  return valor;
}
```

---

## ✅ Vantagens do TypeScript

- Evita erros comuns
- Refatoração mais segura
- Autocompletar com IntelliSense
- Ótimo para times e projetos grandes
- Integração com frameworks (React, Next.js)

---

## 📚 Recursos extras

- [Documentação Oficial](https://www.typescriptlang.org/docs/)