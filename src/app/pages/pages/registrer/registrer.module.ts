import { NgModule } from '@angular/core';
import { RegistrerPageRoutingModule } from '../../registrer/registrer-routing.module';

import { RegistrerPage } from '../../registrer/registrer.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RegistrerPageRoutingModule
  ],
  declarations: [RegistrerPage]
})
export class RegistrerPageModule {}
