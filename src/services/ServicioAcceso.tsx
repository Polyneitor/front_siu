import { Acceso } from "../models/Acceso";
import { URLS } from "../utilities/domains/urls";

export class ServicioAcceso{
    
    public static async iniciarSesion(objAcceso: Acceso): Promise<any> {
        const datosEnviar = {
            method: 'POST',
            body: JSON.stringify(objAcceso),
            headers: {'Content-Type': 'application/json'}
        }

        const urlEnviar = URLS.URL_BASE + URLS.INICIO_SESION;

        const respuesta = fetch(urlEnviar, datosEnviar)
        .then((res)=> res.json())
        .then((datos)=> {return datos})
        .catch((elError) => { return elError; })

        return respuesta;
    }
}