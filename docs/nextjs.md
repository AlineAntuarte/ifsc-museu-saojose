# 📘 Documentação Completa: Next.js

## 🧠 O que é Next.js?

Next.js é um framework baseado em React que permite criar aplicações web completas, modernas e otimizadas. Criado pela **Vercel**, ele adiciona recursos que não existem no React puro, como renderização do lado do servidor, roteamento automático e integração com API.

Ele é ideal para quem busca performance, SEO, escalabilidade e facilidade de manutenção no desenvolvimento frontend e fullstack.

---

## ⚙️ Como o Next.js funciona?

Next.js funciona sobre o React e oferece:

- **SSR (Server Side Rendering):** a página é gerada no servidor a cada requisição.
- **SSG (Static Site Generation):** a página é gerada durante o build e serve arquivos HTML estáticos.
- **ISR (Incremental Static Regeneration):** páginas estáticas podem ser atualizadas após o deploy.
- **Roteamento baseado em arquivos:** cada arquivo `.js` ou `.tsx` em `/pages` vira uma rota automaticamente.
- **API Routes:** arquivos dentro de `/pages/api` são tratados como endpoints de API.
- **Otimizações automáticas:** imagens, divisão de código, carregamento sob demanda e muito mais.

---

## 🧩 Recursos principais

### ✅ Renderização híbrida

```txt
SSR -> Ideal para conteúdos dinâmicos
SSG -> Ideal para blogs, landing pages
ISR -> Combina benefícios de SSR e SSG
```

### ✅ Roteamento automático

```bash
/pages/index.tsx       -> "/"
/pages/contato.tsx     -> "/contato"
```

### ✅ Criação de APIs

```ts
// pages/api/hello.ts
export default function handler(req, res) {
  res.status(200).json({ mensagem: "Olá, mundo!" });
}
```

### ✅ Performance otimizada

- Lazy loading
- Otimização de imagens com `<Image>`
- Code splitting automático

---

## 🚀 Iniciando um projeto com Next.js

```bash
npx create-next-app@latest meu-projeto
cd meu-projeto
npm run dev
```

Abra no navegador: [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Tecnologias que integram bem com Next.js

- **TypeScript**
- **Tailwind CSS**
- **ESLint**
- **React Query / TanStack**
- **Prisma**
- **Auth.js (antigo NextAuth.js)**

---

## ✅ Vantagens do Next.js

- SEO eficiente com SSR
- Roteamento sem configuração
- API integrada
- Melhoria de performance automática
- Ferramentas prontas para produção

---

## 📚 Recursos adicionais

- [Documentação oficial](https://nextjs.org/docs)
- [Vercel](https://vercel.com)
