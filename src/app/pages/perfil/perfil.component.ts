import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioFireBaseService } from 'src/app/services/usuario-fire-base.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  FormPerfil!: FormGroup;
  data!: string;
  isSubmitted: boolean = false;
  edicao: boolean = true;
  user: any;
  nome: any
  conta: any;
  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {}
  ngOnInit(): void {
    this.conta = this.authService.userLogged();

    if(this.conta) {
      this.FormPerfil = this.formBuilder.group({
        nome: [this.conta.nome, [Validators.required]],
        email: [this.conta.email, [Validators.required]],
      })
    }else {
      this.router.navigate(['/login']);
    }
  }

  
  submitForm(): boolean{
    this.isSubmitted = true;
    if(!this.FormPerfil.valid){
      this.isSubmitted = false;
      this.FormPerfil.reset();
      alert("Todos os campos são Obrigatórios!");
      return false;
    }
      this.editar();
      return true;
  }

  habilitarEdicao(){
    if(this.edicao == true){
      this.edicao = false;
    }else{
      this.edicao = true;
    }
  }

  private editar(){
    
    this.authService.editUser(this.FormPerfil.controls['nome'].value, this.FormPerfil.controls['email'].value);
  }

  recuperacao(){
    this.authService.recuperacao(this.conta.email);
  }
}
