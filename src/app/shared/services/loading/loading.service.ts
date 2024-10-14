import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading: HTMLIonLoadingElement | null = null;

  constructor(private readonly loadControl: LoadingController) { }

  public async show(message: string = 'Cargando...') {
    // Asegúrate de que cualquier loading existente se cierre primero
    await this.dismiss();

    this.loading = await this.loadControl.create({
      message: message,
      spinner: 'bubbles',
      // Removemos la duración para que no se cierre automáticamente
    });

    await this.loading.present();
  }

  public async dismiss() {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = null;
    }
  }
}