import { NgModule } from '@angular/core';
import { RegistrerPageRoutingModule } from './registrer-routing.module';

import { RegistrerPage } from './registrer.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RegistrerPageRoutingModule
  ],
  declarations: [RegistrerPage]
})
export class RegistrerPageModule {}
