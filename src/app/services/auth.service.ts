import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, updateEmail, updatePassword, sendPasswordResetEmail } from 'firebase/auth';

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

    let conta = {user: user, nome: nome, email: email, senha: senha}
    return conta
   }
   
   editUser(novoNome: string, novoEmail: string){
      this.createAuth();
      let user = this.auth.currentUser;
      updateProfile(user, {displayName: novoNome}).then(() => {
        updateEmail(user, novoEmail);
        alert("email enviado!")
      }).catch(() => {
        alert("erro")
      })
    }

    recuperacao(email: string){
      this.createAuth();
      sendPasswordResetEmail(this.auth, email).then(() => {
        alert("Email para troca de senha enviado para" + " " + email);
      }).catch(() => {
        alert("Email não é válido!");
      });
    }
}

