
<p align="center">
<a href="https://github.com/xavimondev/visql" target="_blank">
<img src="https://visql.vercel.app/banner.webp" width="100%" alt="Banner" />
</a>
</p>

<p align="center">
<img src="https://img.shields.io/github/stars/xavimondev/visql" alt="GitHub stars" />
<img src="https://img.shields.io/github/contributors/xavimondev/visql" alt="GitHub contributors" />
<img src="https://img.shields.io/github/license/xavimondev/visql" alt="GitHub license" />
<img src="https://img.shields.io/github/actions/workflow/status/xavimondev/visql/main.yml" alt="GitHub workflow" />
</p>

## Overview

ViSQL is a platform to convert your database diagrams into functional SQL code effortlessly, leveraging the power of the integrated [Vision API](https://platform.openai.com/docs/guides/vision). With a user-friendly CLI, you can quicly download the generated SQL code directly to your local environment or integrate it into your Supabase project.

## Project Structure

```bash
├── .github
│   └── workflows
├── apps
│   └── website
│       ├── public
│       ├── src
│       │   ├── actions.ts
│       │   ├── app
│       │   ├── components
│       │   ├── constants.ts
│       │   ├── db
│       │   ├── helpers
│       │   ├── hooks
│       │   ├── lib
│       │   ├── prompt.ts
│       │   ├── services
│       │   └── types
│       └── supabase
├── packages
│   ├── cli
│   ├── eslint-config
│   └── typescript-config
└── turbo.json
```

## Project Summary

- [.github/workflows](/.github/workflows): Github actions workflows.
- [apps/website/public](/apps/website/public): Public resources for the frontend.
- [apps/website/src/actions.ts](/apps/website/src/actions.ts): Server actions.
- [apps/website/src/app](/apps/website/src/app): Handles API-related and pages functionalities.
- [apps/website/src/components](/apps/website/src/components): Contains server and client components.
- [apps/website/src/db](/apps/website/src/db): Contains supabase clients.
- [apps/website/src/helpers](/apps/website/src/helpers): A collection of functions used in the whole project.
- [apps/website/src/hooks](/apps/website/src/hooks): Custom hooks.
- [apps/website/src/lib](/apps/website/src/lib): Utils for shadcn styles.
- [apps/website/src/prompt.ts](/apps/website/src/prompt.ts): Prompt used to generate SQL.
- [apps/website/src/services](/apps/website/src/services): Handle Supabase API calls.
- [apps/website/src/types](/apps/website/src/types): Typescript types used through the project.
- [apps/website/supabase](/apps/website/supabase): Manages all logic to work with Supabase, whether remotely or locally.
- [packages/cli](/packages/cli): Directory for the command-line interface package.
- [packages/eslint-config](/packages/eslint-config): Directory for the global eslint configuration.
- [packages/typescript-config](/packages/typescript-config): Contains Typescript configuration to be shared throughout the project.

## Stack

### Website

- [supabase/supabase-js](https://www.npmjs.com/package/supabase-js): Client library for Supabase, an open-source Firebase alternative.
- [next](https://www.npmjs.com/package/next): A framework for server-rendered React applications.
- [shadcn/ui](https://ui.shadcn.com/): Provides beautifully designed components for UI.
- [sonner](https://github.com/emilkowalski/sonner): An opinionated toast component for React.
- [monaco-editor/react](https://www.npmjs.com/package/monaco-editor): A Monaco Editor wrapper for React applications.
- [zustand](https://www.npmjs.com/package/zustand): A small, fast, and scalable state management library for React.
- [react-dropzone](https://www.npmjs.com/package/react-dropzone): A simple and customizable file dropzone component for React.
- [typescript](https://www.npmjs.com/package/typescript): A typed superset of JavaScript that compiles to plain JavaScript.

### Cli

- [tsup](https://github.com/egoist/tsup): A TypeScript-focused module bundler.
- [chalk](https://github.com/chalk/chalk): Chalk is a library for styling terminal text with color and formatting options, making console output more visually appealing and readable.
- [commander](https://github.com/tj/commander.js/): Commander is a feature-rich library for creating command-line interfaces (CLIs) in Node.js.
- [execa](https://github.com/sindresorhus/execa): Execa is a package that simplifies running external commands in Node.js, providing a more straightforward and powerful interface than Node.js' built-in child_process module.
- [glob](https://github.com/isaacs/node-glob): Glob is a package used for pattern matching files and directories, enabling developers to easily find and work with sets of file paths using wildcard characters.
- [ora](https://github.com/sindresorhus/ora): Ora is a library that creates elegant terminal spinners and loading indicators.
- [prompts](https://github.com/terkelg/prompts): Prompts is a user-friendly library for creating interactive command-line prompts, allowing developers to easily gather user input in a structured and customizable way. Prompts Repository

## Setting Up

### NEXT_PUBLIC_SUPABASE_URL - NEXT_PUBLIC_SUPABASE_ANON_KEY

1. Sign In on Supabase.
2. Go to settings option on sidebar.
3. Select API option on project settings block.
4. Copy **anon public** and **URL**.

### OPENAI_API_TOKEN

- Go to the [OpenAI website](https://openai.com/).
- Sign in to your account or create a new one.
- Navigate to your [API settings](https://platform.openai.com/account/api-keys).
- Generate an Secret key.
- Copy the generated Secret key.

### UPSTASH_REDIS_REST_URL - UPSTASH_REDIS_REST_TOKEN

- Go to the Uptash [console](https://console.upstash.com/).
- Sign in to your account or create a new one.
- Navigate to your database.
- Copy the generated keys.

## Run Locally

1.Clone the visql repository:

```sh
git clone https://github.com/xavimondev/visql
```

2.Install the dependencies with one of the package managers listed below:

```bash
pnpm install
```

3.Start the development:

```bash
## web
pnpm dev:web

## cli
pnpm dev:cli
```

## Contributors

<a href="https://github.com/xavimondev/visql/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=xavimondev/visql" />
</a>

## License

[**Creative Commons Legal Code**](https://github.com/xavimondev/visql/blob/main/LICENSE).

## Useful links

- https://vercel.com/docs/monorepos/turborepo
- https://supabase.com/docs/guides/auth/server-side/email-based-auth-with-pkce-flow-for-ssr
- https://supabase.com/docs/guides/auth/server-side/oauth-with-pkce-flow-for-ssr

## Troubleshooting

### Using Bun: Could not determine executable to run for package supabase

Upgrade bun's version

```bash
bun upgrade
```

More details: **https://twitter.com/bunjavascript/status/1734470860755566815**