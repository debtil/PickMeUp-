import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Usuario} from 'src/app/models/usuario';
import { UsuarioFireBaseService } from 'src/app/services/usuario-fire-base.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  formCadastro: FormGroup = this.formBuilder.group({}); 
  isSubmitted: boolean = false;
  hidden: boolean = false;


  constructor(private formBuilder: FormBuilder, private router: Router, private usuarioFS: UsuarioFireBaseService,
     private authService: AuthService) { 
      let user = this.authService.userLogged();
      if(user !== null) {
        console.log(user)
        this.hidden = false
      }else {
        console.log('conta')
        this.hidden = true
      }
  }

  ngOnInit(): void {
    this.formCadastro = this.formBuilder.group({
      nome: ["",[Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      senha: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  get errorControl(){
    return this.formCadastro.controls;
  }

  submitForm(): boolean{
    this.isSubmitted = true;
    if(!this.formCadastro.valid){
      alert("Todos os campos são obrigatórios!");
      return false;  
    }
      this.cadastrar();
      return true;
  }

  private cadastrar() : void {
    this.authService.createUser(this.formCadastro.controls['nome'].value, this.formCadastro.controls['email'].value, 
    this.formCadastro.controls['senha'].value)
    .then((userCredential) => {
      alert("Conta criada com sucesso!");
      const user = userCredential;
      this.router.navigate(['/login']);
      //const userId = 'teste'
      // para mandar pro perfil ===> this.router.navigate(['/home/:id', userId]);
      console.log(user);
      //let objeto: Usuario = new Usuario(this.formCadastro.value.nome, this.formCadastro.value.email, this.formCadastro.value.senha);
      //this.router.navigateByUrl('/perfil', {state: {objeto: objeto}});
    })
    .catch((error) => {
      alert("Erro ao criar conta!");
      console.log(error);
    })
  }

  getErrorControl(control: string, error: string): boolean {
    return this.formCadastro.controls[control].hasError(error)
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
