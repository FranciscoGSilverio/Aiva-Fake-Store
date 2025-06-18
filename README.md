
# 🛒 AIVA FAKE STORE

Frontend moderno para e-commerce construído com Next.js, Tailwind CSS e shadcn/ui, com otimização de imagens, testes completos e pipelines CI configuradas com GitHub Actions.

O projeto tem como objetivo completar o desafio técnico proposto pela AIVA.
A api escolhida foi (https://api.escuelajs.co/docs) para implementar a simulação de um e-commerce.

🔗 Url de produção: https://aiva-fake-store.vercel.app/

## 🚀 Rotas principais 
A página contem 4 rotas principais

- 🔐 Página de login 
    (funcionalidade não implementada pela falta de suporte da API, o usuário pode ainda assim entrar como convidado)
- 🏠 Pagina principal 
    (Listagem dos produtos, filtragem por categorias, criação e deleção de produtos)
- 📦 Página do produto 
    (informações específicas sobre um produto e listagem de produtos relacionados)
- ❓ Página 404 
    (Para rotas que não existem na aplicação)

## ⚡Next.js x Vite

Embora o Vite seja uma ferramenta excelente para bundling rápido e desenvolvimento de apps React, escolhi Next.js para este projeto por conta de:

- SSR (Renderização no Servidor) e SSG (Geração Estática) integrados: importante para SEO e carregamento inicial rápido.

- Roteamento baseado em arquivos que simplifica a criação e organização das páginas.

- Otimização automática de imagens via o componente `Image` do Next.js, que gera imagens otimizadas e com lazy loading nativo.

- Suporte para API Routes e middlewares, permitindo funcionalidades backend no mesmo projeto se necessário.

- Grande comunidade e ecossistema, com diversos plugins e suporte oficial.

Esses recursos tornam o Next.js uma escolha poderosa para aplicações React de produção que demandam desempenho e flexibilidade.

## 🖼️ Otimização de imagens

A otimização de imagens no projeto faz uso do component `Image` do Next.js. Algumas otimizações que o componente traz são:

- Redimensionar e servir imagens otimizadas automaticamente nos formatos modernos (WebP, AVIF).

- Aplicar lazy loading nativo para imagens fora da tela.

- Suportar imagens responsivas via a prop sizes.

- Permitir definir dimensões fixas ou preenchimento adaptável ao container.

Exemplo de uso:

```
import Image from "next/image";

<Image
  src={product.images[0]}
  alt={product.title}
  fill
  sizes="(max-width: 768px) 100vw, 25vw"
  className="object-cover rounded-md"
/>
```

Assim, o usuário recebe imagens adequadas ao seu dispositivo, economizando dados e melhorando o desempenho.

## 🎨 Shadcn + Tailwind CSS

A interface une a produtividade do Tailwind CSS com componentes acessíveis prontos do shadcn/ui:

- Com Tailwind, é possível estilizar rapidamente com classes utilitárias:

```
<div className="max-w-[1800px] w-[90vw] mx-auto bg-gradient-to-br p-6 rounded-xl shadow-custom">
  {/* Conteúdo */}
</div>
```

- Os componentes shadcn/ui fornecem elementos React acessíveis que combinam facilmente com o Tailwind:

```
import { Button } from "@/components/ui/button";

<Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2">
  Clique aqui
</Button>
```

Essa combinação acelera o desenvolvimento e mantém a consistência visual.

## 🧪 Testes e Pipelines

Este projeto possui uma estrutura robusta de testes e pipelines automatizadas para garantir qualidade e estabilidade contínua do código.

### Testes
- ✅ Testes Unitários e de Componentes: Utilizei Jest junto com React Testing Library para testar a lógica dos componentes e hooks, assegurando que o comportamento esperado seja mantido durante o desenvolvimento.
  
- 🎭Mocking: Componentes dependentes de contextos, hooks ou APIs externas são isolados com mocks para garantir testes focados e confiáveis.
  
- 🌐 Testes End-to-End (E2E): Foi utilizado o Cypress para simular o comportamento real do usuário, testando fluxos completos como login, navegação, formulários e interações principais da aplicação.

### Pipelines
As pipelines foram configuradas via GitHub Actions que são acionadas em cada push ou pull request nas branches principais (ex: main). Essas pipelines executam:

- 📥 Checkout do código e instalação das dependências.

- 🧹 Execução do lint para verificar padrão de código.

- 🏗️ Build do projeto para garantir que compila sem erros.

- 🧪 Rodam os testes unitários via Jest para validar a lógica.

- 🚀 Iniciam o servidor de desenvolvimento e executam os testes E2E com Cypress, garantindo que a aplicação funcione corretamente no ambiente simulado.

Essa automação garante que novos códigos sejam validados antes de serem integrados, prevenindo bugs em produção e mantendo alta qualidade.
