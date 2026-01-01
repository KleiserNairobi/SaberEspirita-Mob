# Saber Espírita - Mobile App

O **Saber Espírita** é um aplicativo móvel desenvolvido para a divulgação e estudo da Doutrina Espírita de forma interativa e gamificada. Através de quizzes, categorias e desafios, o usuário pode testar e aprofundar seus conhecimentos.

## 📱 Funcionalidades

*   **Autenticação**: Login e Cadastro de usuários (integrado com Firebase Auth).
*   **Quizzes Organizadoss**: Navegação por Categorias e Subcategorias.
*   **Gamificação**:
    *   Pontuação e níveis de acerto.
    *   Feedback imediato de respostas.
    *   Histórico de quizzes realizados.
*   **Criação de Conteúdo**: Funcionalidade para usuários sugerirem ou criarem seus próprios quizzes.
*   **Notificações**: Push notifications para engajamento e atualizações (OneSignal).
*   **Atualizações**: Sistema de verificação de versão para garantir que o usuário tenha sempre o app atualizado.

## 🛠 Tech Stack

O projeto foi construído utilizando as seguintes tecnologias:

*   **Core**: [React Native](https://reactnative.dev/) (v0.79) com [Expo](https://expo.dev/) (v53).
*   **Navegação**: React Navigation (Stacks).
*   **Gerenciamento de Estado**: [Zustand](https://github.com/pmndrs/zustand).
*   **Data Fetching**: [TanStack Query](https://tanstack.com/query/latest) (React Query).
*   **Backend / BaaS**: Firebase (Auth, Firestore, Analytics).
*   **Estilização**:
    *   `react-native-size-matters` para responsividade.
    *   `expo-google-fonts` para tipografia (Courgette, Nunito).
*   **Armazenamento Local**: `react-native-mmkv`.

## 🚀 Como Rodar o Projeto

### Pré-requisitos

*   [Node.js](https://nodejs.org/) instalado.
*   Ambiente configurado para React Native / Expo.

### Instalação

1.  Clone o repositório.
2.  Instale as dependências:

```bash
npm install
# ou
yarn install
```

### Executando

Para iniciar o servidor de desenvolvimento:

```bash
npm start
# ou
npx expo start
```

Você pode rodar especificamente para cada plataforma:

```bash
npm run android
npm run ios
```

## 📦 Scripts de Build

O `package.json` inclui scripts utilitários para facilitar o build e release:

*   `npm run prebuild`: Executa o `expo prebuild`.
*   `npm run build:apk`: Gera o APK para Android.
*   `npm run build:aab`: Gera o Bundle (AAB) para Android.
*   `npm run rename:aab`: Renomeia o arquivo AAB gerado (script customizado).

## 📂 Estrutura do Projeto

*   `src/components`: Componentes reutilizáveis de UI.
*   `src/data`: Dados estáticos ou mockados.
*   `src/hooks`: Custom hooks (ex: `useUser`, `useAuth`).
*   `src/models`: Definições de tipos e interfaces (TypeScript).
*   `src/pages`: Telas da aplicação.
*   `src/routes`: Configuração de navegação (`PublicStack` e `PrivateStack`).
*   `src/services`: Integração com APIs externas (Firebase Service).
*   `src/stores`: Stores do Zustand.
*   `src/utils`: Funções utilitárias e helpers.
