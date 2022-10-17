import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';

import { UsuarioFireBaseService } from 'src/app/services/usuario-fire-base.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  usuarios!: Usuario[];
  nome!: string;
  constructor(private router: Router, private authService: AuthService, private usuarioFS: UsuarioFireBaseService) {
  
    }

  ngOnInit(): void {
    this.carregarUsuarios();

    let conta = this.authService.userLogged();
    if(conta !== null) {
      this.nome = conta.nome
    }else {
      this.router.navigate(['/login']);
    }
    //console.log(this.route.snapshot.params['id']);
  }

  carregarUsuarios(){
    this.usuarioFS.readUser().subscribe((data: Usuario[]) => {this.usuarios = data})
  }
  

  irParaFilme(){
    this.router.navigate(['/filme']);
  }
}
