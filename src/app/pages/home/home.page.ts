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

  constructor(private formBuilder: FormBuilder, private navCtrl: NavController) {  
    const today = new Date();
    const offset = today.getTimezoneOffset();
    today.setMinutes(today.getMinutes() - offset);
    this.minDate = today.toISOString().split('T')[0];  
    
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', [Validators.required]], 
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

  goToList() {
    this.navCtrl.navigateForward('/list');  
  }
}
