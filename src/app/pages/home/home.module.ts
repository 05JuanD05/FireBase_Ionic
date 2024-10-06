import { NgModule } from '@angular/core';
import { HomePage } from './home.page';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    IonicModule,
    ReactiveFormsModule,
    HomePageRoutingModule,
    SharedModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
