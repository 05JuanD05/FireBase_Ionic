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
    databaseURL: 'https://console.firebase.google.com/u/0/project/taller-ionic-ccdcf/firestore/databases/-default-/data?hl=es-419'
  });
  return admin.firestore();
}
