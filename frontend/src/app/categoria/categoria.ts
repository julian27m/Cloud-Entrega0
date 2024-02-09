import { CategoriaTarea } from '../categoria-tarea/categoria-tarea';

export class Categoria {
    id: number;
    nombre: string;
    descripcion: string;
    tareas: Array<CategoriaTarea>


    public constructor(id: number, nombre: string, descripcion: string) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.tareas = [];
    }
}
