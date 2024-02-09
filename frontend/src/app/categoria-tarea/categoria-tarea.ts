import { Tarea } from '../tarea/tarea';

export class CategoriaTarea {
    id: number;
    tarea: Tarea

    public constructor(id: number, tarea: Tarea) {
        this.id = id;
        this.tarea = tarea;
    }

}
