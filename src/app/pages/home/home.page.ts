import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importaciones correctas

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  taskForm: FormGroup;  // Definir el FormGroup
  minDate: string;

  constructor(private formBuilder: FormBuilder) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];  // Inicializar la fecha mínima

    // Inicializar el formulario con validaciones
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      userId: ['', Validators.required],
      done: [false]  // Valor por defecto false para el campo done
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;
      console.log('Task data:', taskData);  // Aquí puedes manejar la información de la tarea (enviar a backend, etc.)
    }
  }
}
