import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioFireBaseService } from 'src/app/services/usuario-fire-base.service';

@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.component.html',
  styleUrls: ['./filmes.component.scss']
})
export class FilmesComponent implements OnInit {
  hidden: boolean = false;
  constructor(private router: Router, private authService: AuthService, private usuarioFS: UsuarioFireBaseService) {
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
