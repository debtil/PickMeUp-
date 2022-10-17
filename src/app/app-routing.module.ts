import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BibliotecaComponent } from './pages/biblioteca/biblioteca.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { FilmesComponent } from './pages/filmes/filmes.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { RecuperacaoComponent } from './pages/recuperacao/recuperacao.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent, 
  },
  {
    path: 'home',
    component: HomeComponent, 
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
  },
  {
    path: 'perfil',
    component: PerfilComponent,
  },
  {
    path: 'biblioteca',
    component: BibliotecaComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'filme',
    component: FilmesComponent,
  },
  {
    path: 'recuperacao',
    component: RecuperacaoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
