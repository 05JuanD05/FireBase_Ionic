import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { NavController } from '@ionic/angular'; // Importar NavController

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  taskForm: FormGroup;  
  minDate: string;
  taskList: any[] = [];  // Aquí se almacenarán las tareas

  constructor(private formBuilder: FormBuilder, private navCtrl: NavController) {  // Agregar NavController al constructor
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];  

    // Inicializar el formulario con validaciones
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      userId: ['', Validators.required],
      done: [false]  
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;
      this.taskList.push(taskData);  // Agregar la tarea a la lista
      this.taskForm.reset({ done: false });  // Reiniciar el formulario
      console.log('Task data:', taskData);
    }
  }

  goToList() {
    this.navCtrl.navigateForward('/list');  // Navegar a la página de lista
  }
}
