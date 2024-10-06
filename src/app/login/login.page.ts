import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { __values } from 'tslib';
import { AuthService } from '../shared/services/auth/auth.service';
import { catchError } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
public email!: FormControl;
public password!: FormControl;
public loginform!: FormGroup;


  constructor( private readonly  authSrv: AuthService, private readonly navCtrl: NavController) {
    this.initForm();
   }
  
  ngOnInit() {
  }

  public async dologin(){
    try{
      const {email,password} = this.loginform.value;
      await this.authSrv.login(email,password);
    }catch (error) {

    }
  }

  private initForm() {
    this.email = new FormControl("",[Validators.required,
    Validators.email]);
    this.password = new FormControl("",[Validators.required]);
    this.loginform = new FormGroup({
     email: this.email,
     password: this.password
    })
  }

}
