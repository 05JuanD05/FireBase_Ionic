import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private readonly JDStorage: AngularFireStorage) { }

  public async uploadFileyGetUrl(file: File): Promise<string>{
    try{
      const name = `users/${Date.now()}-${file.name}`;
      const uploaded = await this.JDStorage.upload(name, file);
      const url = uploaded.ref.getDownloadURL();
      return url;
    }catch(error){
      throw error;
    }
  }
}
