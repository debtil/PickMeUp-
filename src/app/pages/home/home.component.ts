import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';

import { UsuarioFireBaseService } from 'src/app/services/usuario-fire-base.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  usuarios!: Usuario[];
  constructor(private router: Router, private usuarioFS: UsuarioFireBaseService) {
  
    }

  ngOnInit(): void {
  }
  
}
