import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

const Componets = [InputComponent];
const Modules = [
  CommonModule,
  FormsModule,
  IonicModule
];

@NgModule({
  declarations: [... Componets],
  imports: [
    ... Modules
  ],
  exports: [... Componets, ... Modules]
})
export class SharedModule { }
