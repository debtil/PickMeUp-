import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioFireBaseService } from 'src/app/services/usuario-fire-base.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  usuario!: Usuario ;
  usuarios: Usuario[] = [];
  FormCadastro!: FormGroup;
  data!: string;
  isSubmitted: boolean = false;
  edicao: boolean = true;

  constructor(private usuarioFS: UsuarioFireBaseService, private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.carregarUsers();
  }

  submitForm(): boolean{
    this.isSubmitted = true;
    if(!this.FormCadastro.valid){
      alert("Todos os campos são Obrigatórios!");
      return false;
    }
      //this.editar();
      return true;
  }

  habilitarEdicao(){
    if(this.edicao == true){
      this.edicao = false;
    }else{
      this.edicao = true;
    }
  }
/*
  editar(){
    this.usuarioFS.editarUsuario(this.FormCadastro.value, this.usuario.id)
    .then(() => {
      alert("Edição realizada com sucesso!");
      this.router.navigate(["/home"]);
    })
    .catch((error) => {
      alert("Erro ao editar dados");
      console.log(error);
    })
  }*/
  
  /*carregarContatos() {
    this.usuarioFS.getUsuarios()
    .subscribe(res => {
      this.usuarios = res.map(c => {
        return {
          id: c.payload.doc.id,
          ...c.payload.doc.data() as Usuario
        } as Usuario
      })
    })
  }*/

  carregarUsers() {
    this.usuarioFS.readUser().subscribe((data: Usuario[]) => {this.usuarios = data})
  }
  
}
