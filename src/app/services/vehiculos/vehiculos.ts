import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environments';


// Estructura de un vehículo registrado
export interface Vehiculo {
  id: string;
  placa: string;
  marca: string;
  modelo: string;
  anio: number;
  disponible: boolean;
}


// Datos necesarios para crear o actualizar un vehículo
export interface VehiculoDatos {
  placa: string;
  marca: string;
  modelo: string;
  anio: number;
  disponible: boolean;
}


@Injectable({
  providedIn: 'root',
})
export class VehiculosService {


  private readonly apiUrl = `${environment.apiUrl}/vehiculos`;

  constructor(private http: HttpClient) {}

  // GET /vehiculos
  obtenerTodos(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(this.apiUrl);
  }

  // GET /vehiculos/{id}
  obtenerPorId(id: string): Observable<Vehiculo> {
    return this.http.get<Vehiculo>(`${this.apiUrl}/${id}`);
  }

  // POST /vehiculos
  crear(datos: VehiculoDatos): Observable<Vehiculo> {
    return this.http.post<Vehiculo>(this.apiUrl, datos);
  }

  // /vehiculos/{id}
  actualizar(id: string, datos: VehiculoDatos): Observable<Vehiculo> {
    return this.http.put<Vehiculo>(`${this.apiUrl}/${id}`, datos);
  }

  // DELETE /vehiculos/{id}
  eliminar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
