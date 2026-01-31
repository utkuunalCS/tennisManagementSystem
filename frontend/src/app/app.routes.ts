import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/players',
    pathMatch: 'full'
  },
  {
    path: 'players',
    loadComponent: () => import('./features/player-management/player-list/player-list.component').then(m => m.PlayerListComponent)
  },
  {
    path: 'lineup-builder',
    loadComponent: () => import('./features/lineup-builder/lineup-builder.component').then(m => m.LineupBuilderComponent)
  },
  {
    path: '**',
    redirectTo: '/players'
  }
];
