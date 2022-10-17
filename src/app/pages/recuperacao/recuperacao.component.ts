import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recuperacao',
  templateUrl: './recuperacao.component.html',
  styleUrls: ['./recuperacao.component.scss']
})
export class RecuperacaoComponent implements OnInit {
  FormRecuper!: FormGroup;
  isSubmitted: boolean = false;
  hidden: boolean = false;
  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { 
    let user = this.authService.userLogged();
      if(user !== null) {
        console.log(user)
        this.hidden = true
      }else {
        console.log('conta')
        this.hidden = false
      }
  }

  ngOnInit(): void {
    this.FormRecuper = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
    })
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.FormRecuper.valid){
      this.isSubmitted = false;
      this.FormRecuper.reset();
      alert("Todos os campos são Obrigatórios!");
      return false;
    }
    this.enviarRecuperacao();
      return true;
  }

  enviarRecuperacao(){
    this.authService.recuperacao(this.FormRecuper.controls['email'].value);
  }

  getErrorControl(control: string, error: string): boolean {
    return this.FormRecuper.controls[control].hasError(error)
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
