import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private readonly toastMsj: ToastController) { }

  async mesajeToast(message: string, color: string = 'success'){
    const toast = await this.toastMsj.create({
      message,
      duration: 2000,
      color,
      position: 'top',
    });
    toast.present();
  }
}
