import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { LoadingService } from 'src/app/shared/services/loading/loading.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registrer',
  templateUrl: './registrer.page.html',
  styleUrls: ['./registrer.page.scss'],
})
export class RegistrerPage implements OnInit {
  public image!: FormControl;
  public name!: FormControl;
  public lastName!: FormControl;
  public age!: FormControl;
  public email!: FormControl;
  public phone!: FormControl;
  public password!: FormControl;
  public registerForm!: FormGroup;
  public id : string = "";
  public passwordType: 'text' | 'password' = 'password';

  constructor(private readonly authServer: AuthService, private readonly loadService: LoadingService,
    private readonly navControl: NavController, private readonly toastMsj: ToastService,
    private readonly fires: AngularFirestore, private readonly storaService: StorageService,
    private readonly route: ActivatedRoute) {
    this.initForm();
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);
      this.id = params['id'];
      if(this.id) this.fillFormForUpdate();
    })
  }


  public async doRegister() {
    try {
      await this.loadService.show();
      console.log(this.registerForm.value);
      const { email, password, image } = this.registerForm.value;
      const userCreden: any = await this.authServer.registrar(email, password);
      const userId = userCreden.user?.uid; // Obtiene el ID del usuario desde FireBase

      if (!userId) {
        throw new Error('Error al obtener el Id del usuario.');
      }

      let imageUrl = "";
      if (image) {
        imageUrl = await this.storaService.uploadFileyGetUrl(image); // Para obtener la Url
      } else {
        console.warn('Imagen no seleccionada por el usuario registrado');
      }

      await this.registerUsers(userId, email, imageUrl); // Aqui se registra los 3 en el FireStore

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


  public async doUpdate() {
    try {
      await this.loadService.show();
      const updatedData = { ...this.registerForm.value };
  
      // La imagen ya debería ser una URL en este punto
      if (updatedData.image && typeof updatedData.image === 'string') {
        console.log('URL de imagen a actualizar:', updatedData.image);
      } else {
        console.log('No hay nueva imagen para actualizar');
        delete updatedData.image;
      }
  
      console.log('Datos a actualizar:', updatedData);
      await this.fires.collection('users').doc(this.id).update(updatedData);
      console.log('Documento actualizado en Firestore');
  
      this.toastMsj.mesajeToast('User updated successfully', 'success');
      await this.loadService.dismiss();
      this.navControl.navigateBack('/list');
    } catch (error) {
      console.error('Error updating user:', error);
      this.toastMsj.mesajeToast('Error updating user', 'danger');
      await this.loadService.dismiss();
    }
  }

  private async fillFormForUpdate() {
    try {
      // Obtener datos del usuario de Firestore
      const userDoc = await this.fires.collection('users').doc(this.id).get().toPromise();
      const userData = userDoc?.data() as {
        image?: string,
        name?: string,
        lastName?: string,
        age?: string | number,
        phone?: string
      } | undefined;

      if (userData) {
        // Eliminar controles de email y password ya que no deben actualizarse
        this.registerForm.removeControl("email");
        this.registerForm.removeControl("password");

        // Actualizar controles del formulario con los datos del usuario
        this.image.setValue(userData.image || '');
        this.name.setValue(userData.name ?? '');
        this.lastName.setValue(userData.lastName ?? '');
        this.age.setValue(userData.age?.toString() ?? '');
        this.phone.setValue(userData.phone ?? '');

        // Actualizar el valor del formulario
        this.registerForm.updateValueAndValidity();
      } else {
        console.error('Datos de usuario no encontrados');
        // Manejar el caso donde no se encuentran los datos del usuario
        this.toastMsj.mesajeToast('Datos de usuario no encontrados', 'danger');
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
      this.toastMsj.mesajeToast('Error al obtener datos del usuario', 'danger');
    }
  }


  public togglePassword(){
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password'; //Esto es para mostrar y ocultar la password
  }

  // Formulario con validaciones con una adicional para el email
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

  // Registro hacia la BD de FireStore luego de registrar en el Authentication
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
