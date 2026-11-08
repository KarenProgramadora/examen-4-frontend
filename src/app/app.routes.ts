import { Routes } from '@angular/router';
import { Estudiantes } from './pages/estudiantes/estudiantes';
import { Vehiculos } from './pages/vehiculos/vehiculos';
import { Mascotas } from './pages/mascotas/mascotas';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'estudiantes',
    pathMatch: 'full'
  },
  {
    path: 'estudiantes',
    component: Estudiantes
  },
  {
    path: 'vehiculos',
    component: Vehiculos
  },
  {
    path: 'mascotas',
    component: Mascotas
  }
];