import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'forms', pathMatch: 'full' },

  {
    path: 'forms',
    loadComponent: () => import('./features/forms-list/forms-list').then((m) => m.FormsList),
  },

  {
    path: 'editor',
    loadComponent: () => import('./features/form-editor/form-editor').then((m) => m.FormEditor),
  },

  {
    path: 'editor/:id',
    loadComponent: () => import('./features/form-editor/form-editor').then((m) => m.FormEditor),
  },

  {
    path: 'preview/:id',
    loadComponent: () => import('./features/form-preview/form-preview').then((m) => m.FormPreview),
  },

  { path: '**', redirectTo: 'forms' },
];
