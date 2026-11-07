
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  EstudiantesService,
  Estudiante,
  EstudianteDatos
} from '../../services/estudiantes/estudiantes';

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './estudiantes.html',
  styleUrl: './estudiantes.css',
})
export class Estudiantes implements OnInit {

  estudiantes: Estudiante[] = [];

  estudianteSeleccionado: Estudiante | null = null;

  busquedaId = '';

  formulario: EstudianteDatos = {
    nombre: '',
    apellido: '',
    correo: '',
    edad: 16
  };

  editando = false;
  cargando = false;

  mensaje = '';
  error = '';

  constructor(private estudiantesService: EstudiantesService) {}

  ngOnInit(): void {
    this.obtenerEstudiantes();
  }

  // Consultar todos los estudiantes
  obtenerEstudiantes(): void {
    this.cargando = true;
    this.error = '';

    this.estudiantesService.obtenerTodos().subscribe({
      next: (datos) => {
        this.estudiantes = datos;
        this.cargando = false;
      },
      error: (err) => {
        this.error = err.error?.detail || 'No fue posible consultar los estudiantes. Verifica que el backend esté funcionando.';
        this.cargando = false;
      }
    });
  }

  // Buscar estudiante por UUID
  buscarPorId(): void {
    if (!this.busquedaId.trim()) {
      this.error = 'Ingresa el UUID del estudiante.';
      return;
    }

    this.error = '';
    this.mensaje = '';

    this.estudiantesService.obtenerPorId(this.busquedaId.trim()).subscribe({
      next: (estudiante) => {
        this.estudianteSeleccionado = estudiante;
        this.mensaje = 'Estudiante encontrado correctamente.';
      },
      error: (err) => {
        this.estudianteSeleccionado = null;
        this.error = err.error?.detail || 'No se encontró el estudiante o el UUID no es válido.';
      }
    });
  }

  // Registrar o actualizar estudiante
  guardarEstudiante(): void {
    this.error = '';
    this.mensaje = '';

    const operacion = this.editando && this.estudianteSeleccionado
      ? this.estudiantesService.actualizar(
          this.estudianteSeleccionado.id,
          this.formulario
        )
      : this.estudiantesService.crear(this.formulario);

    operacion.subscribe({
      next: () => {
        this.mensaje = this.editando
          ? 'Estudiante actualizado correctamente.'
          : 'Estudiante registrado correctamente.';

        this.cancelarEdicion();
        this.obtenerEstudiantes();
      },
      error: (err) => {
        this.error = err.error?.detail || 'No fue posible guardar el estudiante. Revisa los datos ingresados.';
      }
    });
  }

  // Preparar formulario para editar
  editarEstudiante(estudiante: Estudiante): void {
    this.estudianteSeleccionado = estudiante;
    this.formulario = {
      nombre: estudiante.nombre,
      apellido: estudiante.apellido,
      correo: estudiante.correo,
      edad: estudiante.edad
    };

    this.editando = true;
    this.mensaje = '';
    this.error = '';
  }

  // Eliminar estudiante
  eliminarEstudiante(estudiante: Estudiante): void {
    const confirmar = confirm(
      `¿Estás seguro de eliminar a ${estudiante.nombre} ${estudiante.apellido}?`
    );

    if (!confirmar) {
      return;
    }

    this.error = '';
    this.mensaje = '';

    this.estudiantesService.eliminar(estudiante.id).subscribe({
      next: () => {
        this.mensaje = 'Estudiante eliminado correctamente.';
        this.obtenerEstudiantes();
      },
      error: (err) => {
        this.error = err.error?.detail || 'No fue posible eliminar el estudiante.';
      }
    });
  }

  // Limpiar formulario
  cancelarEdicion(): void {
    this.formulario = {
      nombre: '',
      apellido: '',
      correo: '',
      edad: 16
    };

    this.editando = false;
    this.estudianteSeleccionado = null;
  }
}
