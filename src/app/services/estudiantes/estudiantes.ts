
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environments';

// Estructura de un estudiante registrado
export interface Estudiante {
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
  edad: number;
}

// Datos necesarios para crear o actualizar un estudiante
export interface EstudianteDatos {
  nombre: string;
  apellido: string;
  correo: string;
  edad: number;
}

@Injectable({
  providedIn: 'root',
})
export class EstudiantesService {

  private readonly apiUrl = `${environment.apiUrl}/estudiantes/`;

  constructor(private http: HttpClient) {}

  // 1. Consultar todos los estudiantes
  obtenerTodos(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.apiUrl);
  }

  // 2. Consultar un estudiante por su UUID
  obtenerPorId(id: string): Observable<Estudiante> {
    return this.http.get<Estudiante>(`${this.apiUrl}${id}`);
  }

  // 3. Registrar un estudiante
  crear(datos: EstudianteDatos): Observable<Estudiante> {
    return this.http.post<Estudiante>(this.apiUrl, datos);
  }

  // 4. Actualizar un estudiante
  actualizar(
    id: string,
    datos: EstudianteDatos
  ): Observable<Estudiante> {
    return this.http.put<Estudiante>(`${this.apiUrl}${id}`, datos);
  }

  // 5. Eliminar un estudiante
  eliminar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }
}
