import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AvatarComponent } from './components/avatar/avatar.component';
import { StorageService } from './services/storage/storage.service';
import { ButtonComponent } from './components/button/button.component';
import { AuthService } from './services/auth/auth.service';
import { LoadingService } from './services/loading/loading.service';

const Componets = [
  InputComponent,
  AvatarComponent,
  ButtonComponent
];
const Modules = [
  CommonModule,
  FormsModule,
  IonicModule,
  ReactiveFormsModule
];

const Providers = [
  StorageService,
  AuthService
];

const Controles = [
  LoadingService
]
@NgModule({
  declarations: [... Componets],
  imports: [
    ... Modules,
  ],
  providers: [... Providers, ... Controles],
  exports: [... Componets, ... Modules]
})
export class SharedModule { }
