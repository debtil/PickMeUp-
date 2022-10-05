import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Usuario} from 'src/app/models/usuario';
import { UsuarioFireBaseService } from 'src/app/services/usuario-fire-base.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  formCadastro: FormGroup = this.formBuilder.group({}); 
  isSubmitted: boolean = false;

  constructor(private formBuilder: FormBuilder, 
    private router: Router,
    private usuarioFS: UsuarioFireBaseService) { 
    }

  ngOnInit(): void {
    this.formCadastro = this.formBuilder.group({
      nome: ["",[Validators.required]],
      email: ["", [Validators.required]],
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
    this.usuarioFS.inserirUsuario(this.formCadastro.value)
    .then(() => {
      alert("Conta criada com sucesso!");
      let objeto: Usuario = new Usuario(this.formCadastro.value.nome, this.formCadastro.value.email, this.formCadastro.value.senha);
      this.router.navigateByUrl('/perfil', {state: {objeto: objeto}});
    })
    .catch((error) => {
      alert("Erro ao criar conta!");
      console.log(error);
    })
  }
}
