import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { __values } from 'tslib';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
public email!: FormControl;
public password!: FormControl;
public loginform!: FormGroup;


  constructor() { }
  
  ngOnInit() {
  }

  private initForm() {
    this.email = new FormControl("",[Validators.required, Validators.email]);
  }

}
