# My Form Builder

My Form Builder is a single-page Angular application for designing data-capture forms without writing code. Create questions, group them with separators, wire conditional logic, and preview the end-user experience in one place. All form definitions are stored locally in the browser so you can iterate quickly before integrating a backend.

## Features
- Catalog of saved forms with quick create/edit actions backed by `localStorage`.
- Drag-and-drop form editor with separators, clusters, and reusable question templates.
- Item types for text, number, date, radio, and checkbox questions with configurable extras.
- Rule builder that lets you combine conditions (AND/OR) and attach UI or validation actions.
- Live preview screen that renders the form definition using reactive Angular forms.
- PrimeNG Aura-themed UI, Bootstrap layout utilities, and zoneless change detection for snappy updates.

## Tech Stack
- Angular 20 (standalone components, signals, zoneless change detection)
- PrimeNG + PrimeUIX Aura theme, Bootstrap 5, Angular CDK drag & drop
- TypeScript 5.9, RxJS 7, Karma/Jasmine test runner
- Browser `localStorage` for persistence (no server dependency yet)

## Getting Started
### Prerequisites
- Node.js 20 LTS (Angular 20 requires Node 18+, 20 LTS is recommended)
- npm 10+
- Angular CLI (`npm install -g @angular/cli`) is optional but useful for generators

### Installation
```bash
npm install
npm start
```

The `start` script runs `ng serve -o`, compiling the app in development mode and opening `http://localhost:4200/`. The Angular CLI reloads the page each time you save a file.

### Useful Scripts
- `npm run build` – production build output in `dist/`
- `npm run test` – execute unit tests with Karma + Jasmine
- `npm run format` – format HTML/SCSS/TS files with Prettier
- `npm run format:check` – verify formatting without writing changes

## Project Structure
- `src/app/features/forms-list` – landing page, form cards, create navigation
- `src/app/features/form-editor` – drag-and-drop editor, element compact view, rule builder
- `src/app/features/form-preview` – reactive preview of the generated form definition
- `src/app/services/forms-service.ts` – persistence layer backed by `localStorage`
- `src/app/services/form-editor-service.ts` – transforms reactive forms into domain models
- `src/app/models` – strongly typed form, item, rule, and form-group models
- `src/app/utils` – form validation helpers, string utilities, id generation
- `src/app/app.config.ts` – application providers, routing, zoneless change detection, PrimeNG theme

## Development Notes
- **Persistence**: Forms are stored under the `forms` key in browser `localStorage`. Delete that key in dev tools to reset demo data.
- **Reactive Forms**: Editor and preview flows rely on strongly typed `FormGroup` factories in `src/app/models/form-groups`. Keep those helpers in sync with UI changes.
- **Rule Engine**: `RuleEditorFormGroup` models support condition trees (AND/OR) and actions (`show/hide/enable/disable` or validators). Extend the model before adding new operators or actions.
- **Theming**: PrimeNG is configured with the Aura theme in `app.config.ts`. Update the preset or options there to customize styling globally.
- **Change Detection**: The app uses `provideZonelessChangeDetection()`; prefer signals and immutable patterns to keep updates predictable.

## Testing & Quality
- Run `npm run test` to execute unit tests. Write new specs alongside components or services when adding logic.
- Prettier enforces formatting; run `npm run format` before committing or enable your IDE’s auto-format-on-save.
- Angular CLI schematics can scaffold new components: `ng generate component path/to/name`. Remember to keep components standalone to match the existing convention.

## Troubleshooting
- **Blank form list**: Ensure you have at least one form saved or clear the `forms` key and create a new form.
- **Drag-and-drop blocked**: The editor prevents consecutive separators; check the console log if a drop is ignored.
- **Outdated dependencies**: Re-run `npm install` after pulling changes that modify `package.json` or `package-lock.json`.

Happy form building!
