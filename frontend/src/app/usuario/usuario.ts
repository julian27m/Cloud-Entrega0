export class Usuario {
    username: string;
    password: string;
    foto: string;

    public constructor(username: string, password:string, foto:string) {
        this.username = username
        this.password = password
        this.foto = foto
    }
}
