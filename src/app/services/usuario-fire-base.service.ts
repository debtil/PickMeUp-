import { Injectable } from '@angular/core';
import { 
  addDoc, 
  collection, 
  collectionData, 
  doc, 
  updateDoc,
  deleteDoc, 
  Firestore 
} from '@angular/fire/firestore'
import { Observable } from 'rxjs';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import {Usuario} from '../models/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioFireBaseService {
  private PATH : string = "usuarios";

  constructor(private angularFirestore: Firestore) { }

  inserirUsuario(usuario: Usuario) {
    usuario.id = doc(collection(this.angularFirestore, 'id')).id
    return addDoc(collection(this.angularFirestore, this.PATH), usuario)
  }

  readUser(): Observable<Usuario[]> {
    let prodRef = collection(this.angularFirestore, this.PATH)
    return collectionData(prodRef, {idField: 'id'}) as Observable<Usuario[]>
  }
}
