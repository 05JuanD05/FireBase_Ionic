import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly jdAuth: AngularFireAuth) { }

  public registrar(email: string, password: string){
    return new Promise((resolve, reject) => {
      this.jdAuth.createUserWithEmailAndPassword(email, password)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
    });
  }

  public login(email: string, password: string){
    return new Promise((resolve, reject) => {
      this.jdAuth.signInWithEmailAndPassword(email, password)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
    })
  }

  public isAuth(){
    return new Promise((resolve, reject) => {
      this.jdAuth.currentUser.then((res) => {
        if(res?.uid){
          resolve(true);
        }else {
          resolve(false);
        }
      })
    })
  }

  public logOut(){
    return new Promise((resolve, reject) => {
      this.jdAuth.signOut()
      .then((res) => resolve(res))
      .catch((err) => reject(err));
    });
    }

  public getCurrentUid() : Promise<string>{
    return new Promise((resolve, reject) => {
      this.jdAuth.currentUser.then((res) => {
        resolve(res?.uid || "");
      });
    });
  }

}
