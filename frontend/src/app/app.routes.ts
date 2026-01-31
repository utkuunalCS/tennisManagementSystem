import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'lineup-builder',
    loadComponent: () => import('./features/lineup-builder/lineup-builder.component').then(m => m.LineupBuilderComponent)
  },
  {
    path: '',
    redirectTo: 'lineup-builder',
    pathMatch: 'full'
  }
];
