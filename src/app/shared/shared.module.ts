import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AvatarComponent } from './components/avatar/avatar.component';
import { StorageService } from './services/storage/storage.service';

const Componets = [
  InputComponent,
  AvatarComponent
];
const Modules = [
  CommonModule,
  FormsModule,
  IonicModule
];

const Providers = [
  StorageService,
];

@NgModule({
  declarations: [... Componets],
  imports: [
    ... Modules,
  ],
  providers: [... Providers],
  exports: [... Componets, ... Modules]
})
export class SharedModule { }
