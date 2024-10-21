export class Acceso{

    public codUsuario: number;
    public nombreAcceso: string;
    public claveAcceso: string;

    constructor(codUsuario: number, nombreAcceso: string, claveAcceso: string) {
        this.codUsuario = codUsuario;
        this.nombreAcceso = nombreAcceso;
        this.claveAcceso = claveAcceso;
    }
}