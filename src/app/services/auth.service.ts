import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth: any;
  constructor(private router: Router, firebaseApp: FirebaseApp) {
   }

   createAuth(){
    this.auth = getAuth(); //gerador de autenticação
   }

   createUser(nome: string, email: string, senha: string){
    this.createAuth()
    return createUserWithEmailAndPassword(this.auth, email, senha).then(() =>{
      this.createAuth();
      let user = this.auth.currentUser;
      updateProfile(user, {displayName: nome}).then(() =>{
        alert("Nome cadastrado!");
      })
    });
   }

   login(email: string, senha: string){
    this.createAuth()
    return signInWithEmailAndPassword(this.auth, email, senha);
   }

   logout(){
    this.createAuth()
    return signOut(this.auth);
   }

   userLogged(){
    this.createAuth()
    return this.auth.currentUser
   }
   
   editUser(novoNome: string, novoEmail: string, novaSenha: string){
    this.createAuth();
    let user = this.auth.currentUser;
    return updateProfile(user, {displayName: novoNome}).then(() =>{
      alert("Nome cadastrado!");
    })
   }
}
