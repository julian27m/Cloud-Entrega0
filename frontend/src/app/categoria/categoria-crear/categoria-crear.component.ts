import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from '../categoria';
import { CategoriaService } from '../categoria.service';
import { Tarea } from 'src/app/tarea/tarea';
import { TareaService } from 'src/app/tarea/tarea.service';

@Component({
  selector: 'app-categoria-crear',
  templateUrl: './categoria-crear.component.html',
  styleUrls: ['./categoria-crear.component.css']
})
export class CategoriaCrearComponent implements OnInit {

  categoriaForm: FormGroup;
  tareasSubForm: FormArray;
  listaTareas: Tarea[]

  constructor(
    private formBuilder: FormBuilder,
    private routerPath: Router,
    private toastr: ToastrService,
    private categoriaService: CategoriaService,
    private tareaService:TareaService
  ) { }

  ngOnInit() {
    this.tareasSubForm = this.formBuilder.array([
      this.formBuilder.group({
        id:[""],
        idTarea: ["", Validators.required]
        })
    ])
    this.categoriaForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(2)]],
      descripcion: ["", [Validators.required, Validators.minLength(2)]],
      tareas: this.tareasSubForm,
    });

    this.tareaService.darTareas().subscribe((tareas) => {
      this.listaTareas = tareas
    });
  }

  crearCategoria(nuevaCategoria: Categoria): void {
    this.categoriaService.crearCategoria(nuevaCategoria).subscribe((categoria) => {
      this.toastr.success("Confirmation", "Registro creado")
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
