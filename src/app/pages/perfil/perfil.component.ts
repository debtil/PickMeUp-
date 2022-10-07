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

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {}
  ngOnInit(): void {

    this.FormPerfil = this.formBuilder.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required]],
      senha: ['****', [Validators.required]],
    })
    
    let user = this.authService.userLogged();
    if(user !== null) {
      user.providerData.forEach((profile: any) => {
        this.FormPerfil.controls['nome'].setValue(profile.displayName)
        this.FormPerfil.controls['email'].setValue(profile.email)
      })
    }else {
      this.router.navigate(['/login']);
    }

    
    /*this.user = this.authService.userLogged()
   .then(() => {
    if(this.user === null){
      this.router.navigate(['/login']);
    }else{
      this.user.providerData.forEach((profile: any) => {
        this.FormPerfil = this.formBuilder.group({
          nome: [profile.displayName, [Validators.required]],
          email: [profile.email, [Validators.required]],
          senha: [profile.password, [Validators.required]],
        })
      })
    }
   })
   .catch(() => {
    this.router.navigate(['/login']);
   })*/
  }

  alterarEdicao(){
    if(this.edicao == true){
      this.edicao = false;
    }else{
      this.edicao = true;
    }
  }
  
  submitForm(): boolean{
    this.isSubmitted = true;
    if(!this.FormPerfil.valid){
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

  editar(){
    this.authService.editUser(this.FormPerfil.controls['nome'].value, this.FormPerfil.controls['nome'].value,
    this.FormPerfil.controls['nome'].value);
  }


/*editar(){
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
}
