import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  taskForm: FormGroup;  
  minDate: string;
  taskList: any[] = [];  

  constructor(private formBuilder: FormBuilder) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];  

    
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
      this.taskList.push(taskData);  
      this.taskForm.reset({ done: false });  
      console.log('Task data:', taskData);
    }
  }
}
