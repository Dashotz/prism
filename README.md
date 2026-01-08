# prism-app (prism)

A Quasar Assignment

## Project Structure

```
prism/
├── backend-example/          # Backend example files
│   ├── database.sql         # PostgreSQL database schema
│   ├── package.json         # Backend dependencies
│   └── server.js            # Example Express server
├── public/                  # Static assets
│   ├── favicon.ico
│   └── icons/              # Favicon icons
├── src/                    # Source code
│   ├── assets/             # Images, fonts, etc.
│   │   ├── fonts/          # Custom fonts
│   │   └── prismlogo.png   # Logo image
│   ├── boot/               # Boot files (runs before app starts)
│   │   └── i18n.ts         # Internationalization setup
│   ├── components/         # Vue components
│   │   ├── AppHeader.vue
│   │   ├── EventBranding.vue
│   │   ├── EventDetails.vue
│   │   ├── EventLogo.vue
│   │   ├── PrivacyPolicySection.vue
│   │   └── RegistrationForm.vue
│   ├── css/                # Global styles
│   │   ├── app.sass
│   │   └── quasar.variables.sass
│   ├── i18n/               # Internationalization
│   │   ├── en-US/
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── layouts/            # Layout components
│   │   └── MainLayout.vue
│   ├── lib/                # Library configurations
│   │   └── supabase.ts     # Supabase client setup
│   ├── pages/              # Page components
│   │   ├── AboutPage.vue
│   │   ├── ContactPage.vue
│   │   ├── ErrorNotFound.vue
│   │   ├── FAQsPage.vue
│   │   ├── HomePage.vue
│   │   ├── RegistrationPage.vue
│   │   └── SpeakersPage.vue
│   ├── router/             # Vue Router configuration
│   │   ├── index.ts
│   │   └── routes.ts
│   ├── services/           # API services
│   │   └── registrationService.ts
│   ├── stores/             # Pinia stores
│   │   └── index.ts
│   ├── utils/              # Utility functions
│   │   └── validation.ts  # Form validation utilities
│   ├── App.vue             # Root component
│   └── env.d.ts            # TypeScript environment types
├── .quasar/                # Quasar generated files (auto-generated)
├── node_modules/           # Dependencies
├── eslint.config.js        # ESLint configuration
├── index.html              # HTML entry point
├── package.json            # Project dependencies
├── postcss.config.js       # PostCSS configuration
├── quasar.config.ts        # Quasar framework configuration
├── tsconfig.json           # TypeScript configuration
└── vercel.json             # Vercel deployment configuration
```

## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
