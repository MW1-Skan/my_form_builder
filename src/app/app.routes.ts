import { Routes } from '@angular/router';
import { FormsList } from './features/forms-list/forms-list';
import { FormEditor } from './features/form-editor/form-editor';
import { FormPreview } from './features/form-preview/form-preview';

export const routes: Routes = [
  { path: '', redirectTo: 'forms', pathMatch: 'full' },

  { path: 'forms', component: FormsList },

  { path: 'editor', component: FormEditor },

  { path: 'editor/:id', component: FormEditor },

  { path: 'preview/:id', component: FormPreview },

  { path: '**', redirectTo: 'forms' },
];
