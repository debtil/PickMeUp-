import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, updateEmail, updatePassword } from 'firebase/auth';

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
      let nome ="";
      let email = "";
      let senha = "";

      if(user !== null){
        user.providerData.forEach((profile:any) => {
           nome = profile.displayName;
           email = profile.email;
           senha = profile.password;
        })
      }

      if(novoNome != nome){
        return updateProfile(user, {displayName: novoNome}).then(() =>{
          alert("Nome cadastrado!");
         })
       }
       if(novoEmail != email){
        alert("Email cadastrado!");
         return updateEmail(user, novoEmail)
       }
       if(novaSenha != senha){
        alert("Senha cadastrado!");
         return updatePassword(user, novaSenha)
       }
       return user;
    }
}

