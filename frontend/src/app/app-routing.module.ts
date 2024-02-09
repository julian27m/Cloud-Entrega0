import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioLoginComponent } from './usuario/usuario-login/usuario-login.component';
import { UsuarioRegistroComponent } from './usuario/usuario-registro/usuario-registro.component';
import { CategoriaListaComponent } from './categoria/categoria-lista/categoria-lista.component';
import { CategoriaCrearComponent } from './categoria/categoria-crear/categoria-crear.component';
import { CategoriaEditarComponent } from './categoria/categoria-editar/categoria-editar.component';
import { TareaListaComponent } from './tarea/tarea-lista/tarea-lista.component';
import { TareaCrearComponent } from './tarea/tarea-crear/tarea-crear.component';
import { TareaEditarComponent } from './tarea/tarea-editar/tarea-editar.component';

const routes: Routes = [
  { path: '', component: UsuarioLoginComponent, pathMatch: 'full' },
  { path: 'registro', component: UsuarioRegistroComponent,  pathMatch: 'full' },
  { path: 'categorias', component: CategoriaListaComponent, pathMatch: 'full'},
  { path: 'categoria/crear', component: CategoriaCrearComponent, pathMatch: 'full'},
  { path: 'categoria/editar/:id', component: CategoriaEditarComponent, pathMatch: 'full'},
  { path: 'tareas', component: TareaListaComponent, pathMatch: 'full'},
  { path: 'tarea/crear', component: TareaCrearComponent, pathMatch: 'full'},
  { path: 'tarea/editar/:id', component: TareaEditarComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
