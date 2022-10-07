import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup = this.formBuilder.group({})
  isSubmitted: boolean = false

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { 
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
    console.log(this.formLogin.value)
    this.login();
    return true
  }

  private login(){
    this.authService.login( this.formLogin.controls['email'].value, this.formLogin.controls['senha'].value).then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      alert("Login realizado com sucesso!");
      this.router.navigate(['/home']);
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(error)
    })
  }
}


