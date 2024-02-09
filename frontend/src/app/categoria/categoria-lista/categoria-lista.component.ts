import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from '../categoria';
import { Tarea } from 'src/app/tarea/tarea';
import { CategoriaTarea } from 'src/app/categoria-tarea/categoria-tarea';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-lista',
  templateUrl: './categoria-lista.component.html',
  styleUrls: ['./categoria-lista.component.css']
})
export class CategoriaListaComponent implements OnInit {

  categorias:Array<Categoria> = []
  categoriaElegida: Categoria

  constructor(
    private routerPath: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit() {
    this.categoriaService.darCategorias().subscribe((categorias) => {
      this.categorias = categorias;
    },
    error => {
      if (error.statusText === "UNAUTHORIZED") {
        this.toastr.error("Error","Su sesión ha caducado, por favor vuelva a iniciar sesión.")
      }
      else if (error.statusText === "UNPROCESSABLE ENTITY") {
        this.toastr.error("Error","No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
      }
      else {
        this.toastr.error("Error","Ha ocurrido un error. " + error.message)
      }
    });
  }

  crearCategoria():void {
    this.routerPath.navigate(['/categoria/crear/']);
  }

  editarCategoria(idCategoria: number):void {
    this.routerPath.navigate(['/categoria/editar/' + idCategoria]);
  }

  borrarCategoria(idCategoria: number):void {
    this.categoriaService.borrarCategoria(idCategoria).subscribe((categoria) => {
      this.toastr.success("Confirmation", "Registro eliminado de la lista")
      this.ngOnInit();
    },
    error => {
      if (error.statusText === "UNAUTHORIZED") {
        this.toastr.error("Error","Su sesión ha caducado, por favor vuelva a iniciar sesión.")
      }
      else if (error.statusText === "UNPROCESSABLE ENTITY") {
        this.toastr.error("Error","No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
      }
      else {
        this.toastr.error("Error","Ha ocurrido un error. " + error.message)
      }
    });
  }

}
