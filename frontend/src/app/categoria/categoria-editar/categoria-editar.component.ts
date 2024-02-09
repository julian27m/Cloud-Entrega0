import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from '../categoria';
import { CategoriaService } from '../categoria.service';
import { TareaService } from 'src/app/tarea/tarea.service';

import { Tarea } from 'src/app/tarea/tarea';
import { CategoriaTarea } from 'src/app/categoria-tarea/categoria-tarea';

@Component({
  selector: 'app-categoria-editar',
  templateUrl: './categoria-editar.component.html',
  styleUrls: ['./categoria-editar.component.css']
})
export class CategoriaEditarComponent implements OnInit {

  categoria: Categoria
  categoriaForm: FormGroup = {} as FormGroup
  tareasSubForm: FormArray  = {} as FormArray
  listaTareas: Tarea[]

  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private routerPath: Router,
    private toastr: ToastrService,
    private categoriaService: CategoriaService,
    private tareaService: TareaService
  ) { }

  ngOnInit() {

    const idCategoria = parseInt(this.router.snapshot.params['id']);

    //Primero cargo los tareas
    this.tareaService.darTareas().subscribe((tareas) => {
      this.listaTareas = tareas

      //Cargo la categoria cuando ya tengo los tareas
      this.categoriaService.darCategoria(idCategoria).subscribe((categoria) => {
        this.categoria = categoria
        this.tareasSubForm = this.formBuilder.array([])

        //Primero diligencio la sub forma para no tener problemas con el bind
        for(var categoriaTarea of this.categoria.tareas) {
          this.adicionarElemento(categoriaTarea.id, categoriaTarea.tarea.id)
        }

        this.categoriaForm = this.formBuilder.group({
          id: [this.categoria.id],
          nombre: [this.categoria.nombre, [Validators.required, Validators.minLength(2)]],
          descripcion: [this.categoria.descripcion, [Validators.required, Validators.minLength(2)]],
          tareas: this.tareasSubForm,
        });


      })
    });

  }

  editarCategoria(cambioCategoria: Categoria): void {
    this.categoriaService.editarCategoria(cambioCategoria).subscribe((categoria) => {
      this.toastr.success("Confirmation", "Registro editado")
      this.categoriaForm.reset();
      this.routerPath.navigate(['/categorias/']);
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
    })

  }

  adicionarElemento(id:number, idTarea:number): void {
    const filaNueva = this.formBuilder.group({
      id: [id, Validators.required],
      idTarea: [idTarea, Validators.required]
    })
    this.tareasSubForm.push(filaNueva)
  }

  cancelarCategoria(): void {
    this.categoriaForm.reset();
    this.routerPath.navigate(['/categorias/']);
  }

  adicionarTarea(): void {
    const filaNueva = this.formBuilder.group({
      id: [""],
      idTarea: ["", Validators.required]
    })

    this.tareasSubForm.push(filaNueva)
  }

  eliminarTarea(indice: number): void {
    this.tareasSubForm.removeAt(indice)
  }

}
