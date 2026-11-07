import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  MascotasService,
  Mascota,
  MascotaDatos
} from '../../services/mascotas/mascotas';

// Fecha de hoy en formato AAAA-MM-DD (hora local)
function fechaHoy(): string {
  const d = new Date();
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const dia = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mes}-${dia}`;
}

function formularioVacio(): MascotaDatos {
  return {
    nombre: '',
    especie: '',
    edad_meses: 0,
    esterilizado: false,
    fecha_ingreso: fechaHoy()
  };
}

@Component({
  selector: 'app-mascotas',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './mascotas.html',
  styleUrl: './mascotas.css',
})
export class Mascotas implements OnInit {

  mascotas: Mascota[] = [];

  mascotaSeleccionada: Mascota | null = null;

  busquedaId = '';

  formulario: MascotaDatos = formularioVacio();

  editando = false;
  cargando = false;

  mensaje = '';
  error = '';

  constructor(private mascotasService: MascotasService) {}

  ngOnInit(): void {
    this.obtenerMascotas();
  }

  // Arma el mensaje de error segun la respuesta del backend
  private textoError(err: any, porDefecto: string): string {
    if (err.status === 0) {
      return 'No hubo conexion con el servidor. Verifica que el backend este encendido.';
    }
    const detalle = err.error?.detail;
    return typeof detalle === 'string' ? detalle : porDefecto;
  }

  // GET /mascotas: listar todas
  obtenerMascotas(): void {
    this.cargando = true;
    this.error = '';

    this.mascotasService.obtenerTodas().subscribe({
      next: (datos) => {
        this.mascotas = datos;
        this.cargando = false;
      },
      error: (err) => {
        this.mascotas = [];
        this.error = this.textoError(err, 'No fue posible consultar las mascotas.');
        this.cargando = false;
      }
    });
  }

  // GET /mascotas/{id}: buscar por UUID
  buscarPorId(): void {
    if (!this.busquedaId.trim()) {
      this.error = 'Ingresa el UUID de la mascota.';
      return;
    }

    this.error = '';
    this.mensaje = '';

    this.mascotasService.obtenerPorId(this.busquedaId.trim()).subscribe({
      next: (mascota) => {
        this.mascotaSeleccionada = mascota;
        this.mensaje = 'Mascota encontrada correctamente.';
      },
      error: (err) => {
        this.mascotaSeleccionada = null;
        if (err.status === 404) {
          this.error = 'No se encontro ninguna mascota con ese UUID.';
        } else {
          this.error = this.textoError(err, 'El UUID no es valido.');
        }
      }
    });
  }

  // POST /mascotas o PUT /mascotas/{id}
  guardarMascota(): void {
    this.error = '';
    this.mensaje = '';

    const operacion = this.editando && this.mascotaSeleccionada
      ? this.mascotasService.actualizar(
          this.mascotaSeleccionada.id,
          this.formulario
        )
      : this.mascotasService.crear(this.formulario);

    operacion.subscribe({
      next: () => {
        this.mensaje = this.editando
          ? 'Mascota actualizada correctamente.'
          : 'Mascota registrada correctamente.';

        this.cancelarEdicion();
        this.obtenerMascotas();
      },
      error: (err) => {
        this.error = this.textoError(
          err,
          'No fue posible guardar la mascota. Revisa los datos ingresados.'
        );
      }
    });
  }

  // Preparar el formulario para editar
  editarMascota(mascota: Mascota): void {
    this.mascotaSeleccionada = mascota;
    this.formulario = {
      nombre: mascota.nombre,
      especie: mascota.especie,
      edad_meses: mascota.edad_meses,
      esterilizado: mascota.esterilizado,
      fecha_ingreso: mascota.fecha_ingreso
    };

    this.editando = true;
    this.mensaje = '';
    this.error = '';
  }

  // DELETE /mascotas/{id}
  eliminarMascota(mascota: Mascota): void {
    const confirmar = confirm(
      `Seguro que deseas eliminar a ${mascota.nombre}?`
    );

    if (!confirmar) {
      return;
    }

    this.error = '';
    this.mensaje = '';

    this.mascotasService.eliminar(mascota.id).subscribe({
      next: () => {
        this.mensaje = 'Mascota eliminada correctamente.';
        this.obtenerMascotas();
      },
      error: (err) => {
        this.error = this.textoError(err, 'No fue posible eliminar la mascota.');
      }
    });
  }

  // Limpiar el formulario
  cancelarEdicion(): void {
    this.formulario = formularioVacio();
    this.editando = false;
    this.mascotaSeleccionada = null;
  }
}
