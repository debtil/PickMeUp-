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
  firebaseErrorMessage!: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private usuarioFS: UsuarioFireBaseService,
     private authService: AuthService) { 
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
      this.router.navigate(['/home']);
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

}
