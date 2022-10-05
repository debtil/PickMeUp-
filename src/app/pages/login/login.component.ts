import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup = this.formBuilder.group({})
  isSubmitted: boolean = false
  constructor(private formBuilder: FormBuilder, private auth: Auth) { 
    this.formLogin = this.formBuilder.group(
      {
        email: ['', [Validators.required]], 
        senha: ['', [Validators.required, Validators.minLength(6)]]
      })
  }

  ngOnInit(): void {
  }

  submitForm(): boolean{
    this.isSubmitted = true
    if(!this.formLogin.valid) {
      alert("Todos os campos são obrigatórios!")
      return false
    }

    this.login()
    return true
  }

  private login(){

  }

  }


