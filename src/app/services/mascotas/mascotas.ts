import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environments';

// Estructura de una mascota registrada
export interface Mascota {
  id: string;
  nombre: string;
  especie: string;
  edad_meses: number;
  esterilizado: boolean;
  fecha_ingreso: string;
}

// Datos necesarios para crear o actualizar una mascota
export interface MascotaDatos {
  nombre: string;
  especie: string;
  edad_meses: number;
  esterilizado: boolean;
  fecha_ingreso: string;
}

@Injectable({
  providedIn: 'root',
})
export class MascotasService {

  private readonly apiUrl = `${environment.apiUrl}/mascotas`;

  constructor(private http: HttpClient) {}

  // 1. Listar todas las mascotas
  obtenerTodas(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(this.apiUrl);
  }

  // 2. Consultar una mascota por su UUID
  obtenerPorId(id: string): Observable<Mascota> {
    return this.http.get<Mascota>(`${this.apiUrl}/${id}`);
  }

  // 3. Registrar una mascota
  crear(datos: MascotaDatos): Observable<Mascota> {
    return this.http.post<Mascota>(this.apiUrl, datos);
  }

  // 4. Actualizar una mascota
  actualizar(id: string, datos: MascotaDatos): Observable<Mascota> {
    return this.http.put<Mascota>(`${this.apiUrl}/${id}`, datos);
  }

  // 5. Eliminar una mascota
  eliminar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
