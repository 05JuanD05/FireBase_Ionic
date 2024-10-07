import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  taskForm: FormGroup;
  minDate: string;
  taskList: any[] = [];
  userCounter: number = 1;

  constructor(private formBuilder: FormBuilder, private navCtrl: NavController) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];

    // Recuperar el valor del contador del localStorage o inicializarlo en 1
    const storedCounter = localStorage.getItem('userCounter');
    this.userCounter = storedCounter ? parseInt(storedCounter) : 1;

    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      done: [false]
    });

    // Recuperar la lista de tareas almacenada en localStorage
    const storedTasks = localStorage.getItem('taskList');
    this.taskList = storedTasks ? JSON.parse(storedTasks) : [];
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;

      // Asignar un userId único basado en el contador
      taskData.userId = `user-${this.userCounter}`;

      // Incrementar el contador y guardarlo en localStorage
      this.userCounter++;
      localStorage.setItem('userCounter', this.userCounter.toString());

      // Agregar la tarea a la lista y guardar en localStorage
      this.taskList.push(taskData);
      localStorage.setItem('taskList', JSON.stringify(this.taskList));

      // Reiniciar el formulario
      this.taskForm.reset({ done: false });
      console.log('Task data:', taskData);
    }
  }

  goToList() {
    this.navCtrl.navigateForward('/list');
  }
}
