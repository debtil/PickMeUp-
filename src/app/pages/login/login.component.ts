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
  hidden: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { 
    this.formLogin = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]], 
        senha: ['', [Validators.required, Validators.minLength(6)]]
      })
      let user = this.authService.userLogged();
      if(user !== null) {
        console.log(user)
        this.hidden = false
      }else {
        console.log('conta')
        this.hidden = true
      }
      console.log(this.hidden)
  }

  ngOnInit(): void {
  }

  submitForm(): boolean{
    this.isSubmitted = true
    if(!this.formLogin.valid) {
      this.isSubmitted = false;
      this.formLogin.reset();
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

  irParaRecu(){
    this.router.navigate(['/recuperacao']);
  }

  getErrorControl(control: string, error: string): boolean {
    return this.formLogin.controls[control].hasError(error)
  }

  irParaLogin() {
    this.router.navigate(['/login']);
  }

  irParaCadastro() {
    this.router.navigate(['/cadastro']);
  }

  irParaBibli() {
    this.router.navigate(['/biblioteca']);
  }

  irParaHome() {
    this.router.navigate(['/home']);
  }

  irParaPerfil() {
    this.router.navigate(['/perfil']);
  }

  disconnect() {
    this.authService.logout()
    .then(() => {
      alert("usuário desconectado!")
      this.irParaLogin()
    }).catch((error) => {
      alert(error)
    });
  }
}


