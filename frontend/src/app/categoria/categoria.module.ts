import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EncabezadoAppModule } from '../encabezado-app/encabezado-app.module';
import { CategoriaListaComponent } from './categoria-lista/categoria-lista.component';
import { CategoriaCrearComponent } from './categoria-crear/categoria-crear.component';
import { CategoriaEditarComponent } from './categoria-editar/categoria-editar.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EncabezadoAppModule
  ],
  declarations: [
    CategoriaListaComponent,
    CategoriaEditarComponent,
    CategoriaCrearComponent
  ],
  exports: [
    CategoriaListaComponent,
    CategoriaCrearComponent,
    CategoriaEditarComponent
  ]
})
export class CategoriaModule { }
