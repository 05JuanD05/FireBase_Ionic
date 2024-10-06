import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/shared/controllers/loading/loading.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-registrer',
  templateUrl: './registrer.page.html',
  styleUrls: ['./registrer.page.scss'],
})
export class RegistrerPage  {
  public image!: FormControl;
  public name!: FormControl;
  public lastName!: FormControl;
  public email!: FormControl;
  public password!: FormControl;
  public registerForm!: FormGroup;

  constructor(private readonly authServer: AuthService, private readonly loadService: LoadingService) {
    this.initForm();
  }

  public async doRegister(){
    try {
      await this.loadService.show();
      console.log(this.registerForm.value);
      const { email, password } = this.registerForm.value;
      const response = await this.authServer.registrar(email, password);
      console.log("", response)
      await this.loadService.dismiss();
    } catch (error) {
      await this.loadService.dismiss();
      console.error(error);
    }
  }

  private initForm(){
    this.image = new FormControl("");
    this.name = new FormControl("", [Validators.required]);
    this.lastName = new FormControl("", [Validators.required]);
    this.email = new FormControl("", [Validators.required, Validators.email]);
    this.password = new FormControl("", [Validators.required]);
    this.registerForm = new FormGroup({
      image: this.image,
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    });
  }
}
