
import { Component, OnInit, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import {
  VehiculosService,
  Vehiculo,
  VehiculoDatos
} from '../../services/vehiculos/vehiculos';

const SIN_CONEXION =
  'Sin conexión con el backend. Verifica que la API esté encendida.';

const formularioVacio = (): VehiculoDatos => ({
  placa: '',
  marca: '',
  modelo: '',
  anio: new Date().getFullYear(),
  disponible: true
});


@Component({
  selector: 'app-vehiculos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './vehiculos.html',
  styleUrl: './vehiculos.css',
})

export class Vehiculos implements OnInit {

  vehiculos = signal<Vehiculo[]>([]);
  cargando = signal(false);
  mensaje = signal('');
  error = signal('');
  editandoId = signal<string | null>(null);

  busquedaId = '';
  formulario: VehiculoDatos = formularioVacio();



  anioMaximo = new Date().getFullYear() + 1;


  constructor(private vehiculosService: VehiculosService) {}

  ngOnInit(): void {
    this.obtenerVehiculos();
  }

  // GET /vehiculos
  obtenerVehiculos(): void {
    this.cargando.set(true);
    this.error.set('');

    this.vehiculosService.obtenerTodos().subscribe({
      next: (datos) => {
        this.vehiculos.set(datos);
        this.cargando.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.vehiculos.set([]);
        this.error.set(this.describirError(err, 'consultar los vehículos'));
        this.cargando.set(false);
      }
    });
  }


  // GET /vehiculos/{id
  buscarPorId(): void {
    const id = this.busquedaId.trim();
    this.mensaje.set('');
    this.error.set('');

    if (!id) {
      this.obtenerVehiculos();
      return;
    }

    this.cargando.set(true);

    this.vehiculosService.obtenerPorId(id).subscribe({
      next: (vehiculo) => {
        this.vehiculos.set([vehiculo]);
        this.mensaje.set('Vehículo encontrado correctamente.');
        this.cargando.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.vehiculos.set([]);
        this.error.set(
          err.status === 0
            ? SIN_CONEXION
            : 'No se encontró ningún vehículo con ese id.'
        );
        this.cargando.set(false);
      }
    });
  }


  // Quitar el filtro y volver a listar todo
  verTodos(): void {
    this.busquedaId = '';
    this.mensaje.set('');
    this.obtenerVehiculos();
  }


  // POST /vehiculos o PUT /vehiculos/{id}
  guardarVehiculo(): void {
    this.error.set('');
    this.mensaje.set('');

    const id = this.editandoId();

    const operacion = id
      ? this.vehiculosService.actualizar(id, this.formulario)
      : this.vehiculosService.crear(this.formulario);

    operacion.subscribe({
      next: () => {
        this.mensaje.set(
          id
            ? 'Vehículo actualizado correctamente.'
            : 'Vehículo registrado correctamente.'
        );
        this.cancelarEdicion();
        this.obtenerVehiculos();
      },
      error: (err: HttpErrorResponse) => {
        this.error.set(this.describirError(err, 'guardar el vehículo'));
      }
    });
  }


  // Cargar un vehículo en el formulario para editarlo
  editarVehiculo(vehiculo: Vehiculo): void {
    this.editandoId.set(vehiculo.id);
    this.formulario = {
      placa: vehiculo.placa,
      marca: vehiculo.marca,
      modelo: vehiculo.modelo,
      anio: vehiculo.anio,
      disponible: vehiculo.disponible
    };
    this.mensaje.set('');
    this.error.set('');
  }


  // DELETE /vehiculos/{id}
  eliminarVehiculo(vehiculo: Vehiculo): void {
    const confirmar = confirm(
      `¿Estás seguro de eliminar el vehículo ${vehiculo.placa}?`
    );

    if (!confirmar) {
      return;
    }

    this.error.set('');
    this.mensaje.set('');

    this.vehiculosService.eliminar(vehiculo.id).subscribe({
      next: () => {
        if (this.editandoId() === vehiculo.id) {
          this.cancelarEdicion();
        }
        this.mensaje.set('Vehículo eliminado correctamente.');
        this.obtenerVehiculos();
      },
      error: (err: HttpErrorResponse) => {
        this.error.set(this.describirError(err, 'eliminar el vehículo'));
      }
    });
  }


  // Limpiar el formulario
  cancelarEdicion(): void {
    this.formulario = formularioVacio();
    this.editandoId.set(null);
  }

  
  // Convierte el error HTTP en un mensaje claro para el usuario
  private describirError(err: HttpErrorResponse, accion: string): string {
    if (err.status === 0) {
      return SIN_CONEXION;
    }
    if (err.status === 404) {
      return 'No se encontró el vehículo.';
    }
    if (err.status === 422) {
      return 'Los datos enviados no son válidos. Revisa los campos.';
    }
    const detalle = err.error?.detail;
    return typeof detalle === 'string'
      ? detalle
      : `No fue posible ${accion}.`;
  }
}
