import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { TaskService } from 'src/app/shared/services/tareas/task.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  taskForm: FormGroup;
  minDate: string;
  taskList: any[] = [];
  userCounter: number = 1;
  editIndex: number | null = null;  
  userId!: string;

  constructor(
    private formBuilder: FormBuilder, 
    private navCtrl: NavController,
    private taskService: TaskService,
    private afAuth: AngularFireAuth
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];

    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      done: [false]
    });
  }

  ngOnInit(): void {
    // Obtener el userId del usuario autenticado
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;

        // Cargar las tareas del usuario desde Firebase
        this.loadTasks();
      }
    });
  }

  loadTasks() {
    this.taskService.getTasks(this.userId).subscribe(tasks => {
      this.taskList = tasks;
    });
  }

  async onSubmit() {
    if (this.taskForm.valid) {
      const taskData = { 
        ...this.taskForm.value, 
        userId: this.userId 
      };

      if (this.editIndex !== null) {
        const confirmEdit = window.confirm('Are you sure you want to edit this task?');
        if (confirmEdit) {
          // Actualizar tarea existente en Firebase
          const taskId = this.taskList[this.editIndex].id;
          await this.taskService.updateTask(taskId, taskData);
          this.editIndex = null;
        }
      } else {
        // Crear una nueva tarea en Firebase
        await this.taskService.createTask(taskData);
      }

      this.taskForm.reset({ done: false });
    }
  }

  onEditTask(index: number) {
    const task = this.taskList[index]; 
    this.taskForm.setValue({
      title: task.title,
      description: task.description,
      date: task.date,
      done: task.done
    });
    this.editIndex = index;
  }

  async onDeleteTask(index: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      const taskId = this.taskList[index].id;
      await this.taskService.deleteTask(taskId);
    }
  }

  goToList() {
    this.navCtrl.navigateForward('/list');
  }
}
