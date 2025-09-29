# Session Booking App

A modern Angular application for session booking with a clean, professional interface built with Angular 20, Angular Material, and comprehensive testing setup.

## 🚀 Features

- **Modern Angular 20** with standalone components
- **Material calendar component** for date selection
- **GraphQL integration** with Apollo Client
- **Date handling** with date-fns library
- **Responsive design** with mobile-first approach
- **Comprehensive testing** with Jasmine, Karma, and Playwright
- **Code quality tools** with ESLint, Prettier, and Stylelint
- **TypeScript** with strict mode enabled

## 📋 Prerequisites

- **Node.js** 20.17.0+ or 22.11.0+ (recommended: use nvm)
- **npm** 9+ or **yarn** 1.22+
- **Git** for version control

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd session-booking-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```
   
   Navigate to `http://localhost:4200/` - the app will automatically reload when you change source files.

## 📦 Available Scripts

### Development
- `npm start` - Start development server
- `npm run watch` - Build in watch mode
- `npm run build` - Production build
- `npm run build --configuration development` - Development build

### Testing
- `npm test` - Run unit tests (single run)
- `npm run test:watch` - Run unit tests in watch mode
- `npm run test:e2e` - Run end-to-end tests
- `npm run test:e2e:headed` - Run e2e tests with browser UI
- `npm run test:e2e:debug` - Debug e2e tests

### Code Quality
- `npm run lint` - Lint TypeScript and HTML files
- `npm run lint:fix` - Auto-fix linting issues
- `npm run lint:styles` - Lint SCSS/CSS files
- `npm run lint:styles:fix` - Auto-fix style linting issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check formatting without changes
- `npm run code-quality` - Run all linting and formatting fixes

## 🏗️ Project Structure

```
src/
├── app/
│   ├── core/                    # Core functionality
│   │   ├── components/          # Shared components
│   │   ├── guards/             # Route guards
│   │   ├── pipes/              # Custom pipes
│   │   ├── services/           # Business logic services
│   │   ├── testing/            # Test utilities
│   │   ├── types/              # TypeScript interfaces
│   │   └── utils/              # Utility functions
│   ├── features/               # Feature modules
│   │   ├── booking-confirmation/
│   │   ├── booking-flow/
│   │   ├── booking-success/
│   │   └── slot-selection/
│   ├── app.config.ts           # App configuration
│   ├── app.routes.ts           # Routing configuration
│   └── app.ts                  # Root component
├── assets/                     # Static assets
├── scss/                       # Global styles
│   ├── design-tokens.scss      # Design system variables
│   └── mixins.scss            # SCSS mixins
├── styles.scss                # Global stylesheet
└── index.html                 # Main HTML file
```

## 🎨 Design System

The app uses a comprehensive design system with:

- **Design tokens** for consistent colors, typography, and spacing
- **Inter font** for optimal readability and Figma design matching
- **CSS custom properties** for theming
- **SCSS mixins** for reusable styles

### Key Design Tokens
- **Colors**: Primary, secondary, background, text variations
- **Typography**: Font sizes, weights, line heights
- **Spacing**: Consistent spacing scale

## 🧪 Testing Strategy

### Unit Testing (Jasmine + Karma)
- **Component tests** with Angular Testing Utilities
- **Service tests** with proper mocking
- **Pipe tests** for data transformations
- **Utility function tests**
- **Coverage reporting** enabled

### E2E Testing (Playwright)
- **Cross-browser testing** (Chromium, Firefox, WebKit)
- **Mobile testing** with device emulation
- **Visual regression testing** capabilities
- **Parallel test execution**

### Test Organization
- **Service spies** for consistent mocking
- **Mock data factories** for test data
- **Page object models** for e2e tests
- **Test utilities** for common operations

## 🔧 Code Quality Tools

### ESLint Configuration
- **@angular-eslint** for Angular-specific rules
- **@typescript-eslint** for TypeScript rules
- **Import sorting** and organization

### Prettier Configuration
- **Consistent formatting** across all files
- **Import sorting** with custom plugin
- **TypeScript, HTML, SCSS** support

### Stylelint Configuration
- **SCSS-specific rules** for consistent styling
- **Order enforcement** for CSS properties
- **Best practices** for maintainable styles
- **BEM**

## 🌐 Technologies Used

### Frontend Framework
- **Angular 20** - Latest Angular with signal-based reactivity
- **TypeScript 5.9** - Type safety and modern JS features
- **RxJS 7.8** - Reactive programming

### UI Framework
- **Angular Material Calendar** - Date picker component
- **Custom SCSS** - Design system implementation

### State Management & Data
- **Apollo GraphQL** - GraphQL client with caching
- **Signal-based state** - Modern Angular reactivity
- **Date-fns** - Modern date manipulation library

### Development Tools
- **Angular CLI 20** - Project tooling and build system
- **Vite-based build** - Fast development and builds
- **Hot Module Replacement** - Fast development feedback

## 📱 Browser Support

- **Chrome** (latest 2 versions)
- **Firefox** (latest 2 versions)
- **Safari** (latest 2 versions)
- **Edge** (latest 2 versions)
- **Mobile browsers** (iOS Safari, Chrome Mobile)

## 🚀 Deployment

### Production Build
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory, optimized for production with:
- **Tree shaking** for minimal bundle size
- **Code splitting** for optimal loading
- **Minification** and compression
- **Source maps** for debugging

### Environment Configuration
- Development: `src/environments/environment.ts`
- Production: `src/environments/environment.prod.ts`

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Run code quality checks** (`npm run code-quality`)
4. **Run tests** (`npm test`)
5. **Commit changes** (`git commit -m 'Add amazing feature'`)
6. **Push to branch** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request**

### Code Standards
- Follow **Angular Style Guide**
- Use **TypeScript strict mode**
- Write **comprehensive tests**
- Follow **accessibility best practices**
- Use **semantic commit messages**

## 📝 Development Workflow

1. **Install dependencies**: `npm install`
2. **Start development server**: `npm start`
3. **Make changes** with hot reload feedback
4. **Run tests**: `npm test`
5. **Check code quality**: `npm run code-quality`
6. **Build for production**: `npm run build`

## 🐛 Troubleshooting

### Common Issues

**Node version mismatch**
```bash
nvm use 22.12.0  # Use project's Node version
```

**Dependencies out of sync**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Test failures**
```bash
npm run test:watch  # Run tests in watch mode for debugging
```

**Build issues**
```bash
npm run build --verbose  # Get detailed build information
```

## 📞 Support

- **Issues**: Report bugs and feature requests via GitHub Issues
- **Documentation**: Check inline code documentation
- **Testing**: Run `npm test` for comprehensive test coverage

## 📄 License

This project is private and proprietary.

---

**Built with ❤️ using Angular 20 and modern web technologies**
