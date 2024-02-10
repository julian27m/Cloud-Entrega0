import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario-registro',
  templateUrl: './usuario-registro.component.html',
  styleUrls: ['./usuario-registro.component.css']
})
export class UsuarioRegistroComponent implements OnInit {

  usuarioForm: FormGroup;
  fotoSeleccionada: File | null = null;

  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService
  ) {
    this.usuarioForm = this.formBuilder.group({
      usuario: ["", [Validators.required, Validators.maxLength(50)]],
      password: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      confirmPassword: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      foto: [null]
    });
  }

  ngOnInit() {
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fotoSeleccionada = file;
      this.usuarioForm.patchValue({ foto: file });
    }
  }

  registrarUsuario() {
    const usuario = this.usuarioForm.get('usuario')?.value;
    const contrasena = this.usuarioForm.get('password')?.value;
    const foto = this.fotoSeleccionada;

    this.usuarioService.registro(usuario, contrasena, foto)
      .subscribe(res => {
        this.router.navigate(['/']);
      },
      error => {
        this.toastrService.error("Error en el registro. Verifique que el usuario no se encuentre ya registrado", "Error", {closeButton: true});
      });
  }
}
