import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { LoadingService } from 'src/app/shared/services/loading/loading.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-registrer',
  templateUrl: './registrer.page.html',
  styleUrls: ['./registrer.page.scss'],
})
export class RegistrerPage  {
  public image!: FormControl;
  public name!: FormControl;
  public lastName!: FormControl;
  public age!: FormControl;
  public email!: FormControl;
  public phone!: FormControl;
  public password!: FormControl;
  public registerForm!: FormGroup;
  public passwordType: 'text' | 'password' = 'password';

  constructor(private readonly authServer: AuthService, private readonly loadService: LoadingService, private readonly navControl: NavController, private readonly toastMsj: ToastService, private readonly auth: AngularFireAuth, private readonly fires: AngularFirestore, private readonly storaService: StorageService) {
    this.initForm();
  }

  public async doRegister() {
    try {
      await this.loadService.show();
      console.log(this.registerForm.value);
      const { email, password, image } = this.registerForm.value;
      const userCreden: any = await this.authServer.registrar(email, password);
      const userId = userCreden.user?.uid;

      if (!userId) {
        throw new Error('Error al obtener el Id del usuario.');
      }

      let imageUrl = "";
      if (image) {
        imageUrl = await this.storaService.uploadFileyGetUrl(image); // Para obtener la Url de forma segura
      } else {
        console.warn('Imagen no seleccionada por el usuario registrado');
      }

      await this.registerUsers(userId, email, imageUrl); // Aqui se manda los 3 datos al la BD de FireStore

      this.toastMsj.mesajeToast('Registro Exitoso, puede ir a loguearse.', 'success');
      await this.loadService.dismiss();
      this.navControl.navigateForward("/login");
    } catch (error) {
      await this.loadService.dismiss();

      if (error instanceof Error) {
        if (error.message.includes('email already in use')) {
          this.toastMsj.mesajeToast('El correo ya está en uso.', 'danger');
        } else {
          this.toastMsj.mesajeToast('Error al registrarse: ' + error.message, 'danger');
        }
      } else {
        this.toastMsj.mesajeToast('Error desconocido al registrarse.', 'danger');
      }
      console.error('Error al registrarse:', error);
    }
  }

  public togglePassword(){
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  private initForm(){
    this.image = new FormControl("");
    this.name = new FormControl("", [Validators.required]);
    this.lastName = new FormControl("", [Validators.required]);
    this.age = new FormControl("", [Validators.required]);
    this.email = new FormControl("", [Validators.required, Validators.email]);
    this.phone = new FormControl("", [Validators.required]);
    this.password = new FormControl("", [Validators.required]);
    this.registerForm = new FormGroup({
      image: this.image,
      name: this.name,
      age: this.age,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      password: this.password
    });
  }

  private async registerUsers(userId: string, email: string, imageFile: string) {
    try {
      await this.fires.collection('users').doc(userId).set({
        email,
        image: imageFile,
        name: this.registerForm.get('name')?.value,
        lastName: this.registerForm.get('lastName')?.value,
        age: this.registerForm.get('age')?.value,
        phone: this.registerForm.get('phone')?.value,
      });
      console.log('User registrado en Firestore');
    } catch (error) {
      console.error('Error al registrar al user en Firestore:', error);
      throw error;
    }
  }
}
