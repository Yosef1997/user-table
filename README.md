# Next.js Project

This is a website project built using [Next.js](https://nextjs.org/). It uses a modular structure and environment variables (.env) for flexible configuration.

## 🚀 Features

- React-based framework powered by Next.js
- Environment variable management using `.env.local`
- Development mode support (`dev`)

## 📚 Dependencies

This project uses the following main dependencies:

- **[shadcn/ui](https://ui.shadcn.com/):** Beautifully designed UI components for building modern React apps.
- **[jose](https://github.com/panva/jose):** A powerful library for dealing with JWT, JWE, JWK, and other JOSE standards.
- **[@tanstack/react-query](https://tanstack.com/query):** Powerful asynchronous state management and data fetching for React.
- **[@tanstack/react-table](https://tanstack.com/table):** Headless table utilities for building fully customizable tables in React.
- **[axios](https://axios-http.com/):** Promise-based HTTP client for the browser and Node.js.
- **[next-themes](https://github.com/pacocoursey/next-themes):** An easy-to-use theme toggler for Next.js apps, useful for implementing dark/light mode.
- **[zod](https://zod.dev/):** TypeScript-first schema declaration and validation library.

## 📦 Installation

Follow the steps below to run this project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/username/projectname.git
cd projectname
```

### 2. Create `.env.local` Configuration File

```bash
cp .env.example .env.local
```

Then adjust the values according to your local environment needs.

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Project

```bash
npm run dev
```

By default, the project will run at `http://localhost:3000`.

## 🚀 Deployment with Vercel

This project is ready to be deployed on [Vercel](https://vercel.com/), a platform optimized for Next.js applications.
Here the deployed link in vercel:

```
https://user-table-liard.vercel.app/
```
