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
  editIndex: number | null = null;  // Para manejar el índice de la tarea a editar

  constructor(private formBuilder: FormBuilder, private navCtrl: NavController) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];

    const storedCounter = localStorage.getItem('userCounter');
    this.userCounter = storedCounter ? parseInt(storedCounter) : 1;

    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      done: [false]
    });

    const storedTasks = localStorage.getItem('taskList');
    this.taskList = storedTasks ? JSON.parse(storedTasks) : [];
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;

      if (this.editIndex !== null) {
        // Actualizar la tarea existente
        this.taskList[this.editIndex] = { ...taskData, userId: this.taskList[this.editIndex].userId };
        this.editIndex = null;  // Limpiar el índice de edición después de actualizar
      } else {
        // Crear una nueva tarea
        taskData.userId = `user-${this.userCounter}`;
        this.userCounter++;
        localStorage.setItem('userCounter', this.userCounter.toString());

        // Agregar la tarea a la lista
        this.taskList.push(taskData);
      }

      // Guardar la lista actualizada en localStorage
      localStorage.setItem('taskList', JSON.stringify(this.taskList));

      // Reiniciar el formulario
      this.taskForm.reset({ done: false });
    }
  }

  onEditTask(index: number) {
    const task = this.taskList[index]; // Obtener la tarea a editar
    this.taskForm.setValue({
      title: task.title,
      description: task.description,
      date: task.date,
      done: task.done
    });
    this.editIndex = index;  // Guardar el índice de la tarea a editar
  }

  goToList() {
    this.navCtrl.navigateForward('/list');
  }
}
