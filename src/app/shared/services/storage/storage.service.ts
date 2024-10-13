import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private readonly JDStorage: AngularFireStorage) { }

  public async uploadFileyGetUrl(file: File): Promise<string>{
    try{
      console.log('Iniciando carga de archivo:', file.name);
      const name = `users/${Date.now()}-${file.name}`;
      console.log('Nombre del archivo en storage:', name);
      const uploaded = await this.JDStorage.upload(name, file);
      console.log('Archivo subido exitosamente');
      const url = await uploaded.ref.getDownloadURL();
      console.log('URL obtenida:', url);
      return url;
    }catch(error){
      console.error('Error en uploadFileyGetUrl:', error);
      throw error;
    }
  }
}
