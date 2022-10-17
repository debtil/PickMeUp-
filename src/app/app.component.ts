import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PickMeUP!';
  hidden: boolean = false;
  toDisplay = false;

  constructor(private router: Router, private authService: AuthService) {
    let user = authService.userLogged();

    if(user) {
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
  
  toggleData() {
    this.toDisplay = !this.toDisplay;
  }
}
