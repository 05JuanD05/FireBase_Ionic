import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as admin from 'firebase-admin';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class FirebaseAdminModule { }

export function initializeFirebaseAdmin(){
  admin.initializeApp({
    credential: admin.credential.cert("path/to/serviceAccountKey.json"),
    databaseURL: ''
  })
}
