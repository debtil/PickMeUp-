import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.scss']
})
export class BibliotecaComponent implements OnInit {
  hidden: boolean = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    let user = this.authService.userLogged();
      if(user !== null) {
        console.log(user)
        this.hidden = true
      }else {
        console.log('conta')
        this.hidden = false
      }
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
