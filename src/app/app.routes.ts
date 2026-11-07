
import { Routes } from '@angular/router';
import { Estudiantes } from './pages/estudiantes/estudiantes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'estudiantes',
    pathMatch: 'full'
  },
  {
    path: 'estudiantes',
    component: Estudiantes
  }
];
