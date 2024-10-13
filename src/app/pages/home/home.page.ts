import { Component, OnInit } from '@angular/core';
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
  editIndex: number | null = null;

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
        const confirmEdit = window.confirm('Are you sure you want to edit this task?');
        if (confirmEdit) {
          this.taskList[this.editIndex] = { ...taskData, userId: this.taskList[this.editIndex].userId };
          this.editIndex = null;
        }
      } else {
        taskData.userId = `user-${this.userCounter}`;
        this.userCounter++;
        localStorage.setItem('userCounter', this.userCounter.toString());

        this.taskList.push(taskData);
      }

      localStorage.setItem('taskList', JSON.stringify(this.taskList));

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

  onDeleteTask(index: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskList.splice(index, 1);
      localStorage.setItem('taskList', JSON.stringify(this.taskList));
    }
  }

  goToList() {
    this.navCtrl.navigateForward('/list');
  }
}
