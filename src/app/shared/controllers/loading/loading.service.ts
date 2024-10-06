import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private readonly loadControl: LoadingController) { }

  public async show(){
    const load = await this.loadControl.create({});
    await load.present();
  }

  public async dismiss(){
    await this.loadControl.dismiss();
  }
}
