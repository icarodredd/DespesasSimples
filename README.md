# Despesas Simples

[![Build](https://img.shields.io/github/actions/workflow/status/icarodredd/DespesasSimples/ci.yml?branch=main&style=flat-square)](https://github.com/icarodredd/DespesasSimples/actions)
[![Coverage](https://img.shields.io/codecov/c/github/icarodredd/DespesasSimples?style=flat-square)](https://codecov.io/gh/icarodredd/DespesasSimples)
[![License](https://img.shields.io/github/license/icarodredd/DespesasSimples?style=flat-square)](LICENSE)
[![Stars](https://img.shields.io/github/stars/icarodredd/DespesasSimples?style=flat-square)](https://github.com/icarodredd/DespesasSimples/stargazers)

Aplicativo de controle de despesas com foco em **prática de testes unitários e de integração** e **mensuração de cobertura de código**. Este projeto foi inspirado no design do Figma: https://www.figma.com/design/mGm31eJZ8UbarIcsORn0DI/Despesas-Simples-Design.

## Objetivos do projeto

- Consolidar práticas de testes unitários com Jest + Testing Library.
- Exercitar testes de integração e interação com o usuário.
- Medir cobertura de testes (linhas, funções, branches e statements).
- Manter uma base de componentes organizada e testável.

## Stack

- **React 18** + **Vite**
- **TypeScript**
- **Jest** + **Testing Library** (unitários e integração)
- **Cypress** (E2E)
- **Tailwind CSS** (estilos)
- **Radix UI** + **shadcn/ui** (componentes)

## Estrutura do projeto

```text
src/
  components/         # Componentes e seus testes (*.spec.tsx)
  hooks/              # Hooks reutilizáveis
  styles/             # Estilos globais
  types/              # Tipagens e contratos
  App.tsx             # Composição das telas
  main.tsx            # Bootstrap da aplicação
cypress/              # Testes E2E
coverage/             # Saída do relatório de cobertura
```

## Requisitos

- Node.js **18+**
- npm **9+** (ou pnpm/yarn, se preferir)

## Instalação

```bash
npm install
```

## Como rodar (desenvolvimento)

```bash
npm run dev
```

O app ficará disponível no host exibido no terminal.

## Build de produção

```bash
npm run build
```

## Testes unitários e de integração

Rodar toda a suíte:

```bash
npm test
```

## Cobertura de testes

Última medição (coverage report atual):

- **Statements:** 96.0%
- **Branches:** 91.7%
- **Functions:** 100%

Gerar relatório completo:

```bash
npm run test:coverage
```

Os relatórios são gerados em [coverage/](coverage/). Para visualizar o HTML:

```text
coverage/lcov-report/index.html
```

## Testes E2E (Cypress)

Abrir a interface do Cypress:

```bash
npx cypress open
```

Rodar em modo headless:

```bash
npx cypress run
```

## Scripts disponíveis

- `npm run dev` — inicia o servidor de desenvolvimento
- `npm run build` — gera build de produção
- `npm test` — executa os testes unitários/integrados
- `npm run test:coverage` — executa testes com cobertura

## Boas práticas aplicadas

- **Testes próximos do código**: arquivos `*.spec.tsx` junto aos componentes.
- **Cobertura visível**: relatórios gerados em [coverage/](coverage/).
- **Componentização**: foco em componentes reutilizáveis e isolados.
- **Acessibilidade**: uso de Testing Library e padrões do Radix UI.

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
