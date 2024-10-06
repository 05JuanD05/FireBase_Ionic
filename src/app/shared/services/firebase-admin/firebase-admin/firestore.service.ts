import { Injectable } from '@angular/core';
import { initializeFirebaseAdmin } from './firebase-admin.module';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private db = initializeFirebaseAdmin();

  constructor() { }

  async writeData(collection: string, documentId: string, data: any){
    try {
      await this.db.collection(collection).doc(documentId).set(data);
      console.log('Dato escrito exitoso');
    } catch (error) {
      console.error('Error al escribir en el dato: ', error);
    }
  }
}
