import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFormulario } from "../../utilities/myHocks/useFormulario";
import { Acceso } from "../../models/Acceso";
import jsSHA from "jssha";
import { ServicioAcceso } from "../../services/ServicioAcceso";
import { DatosSesion } from "../../models/DatosSesion";
import { jwtDecode } from "jwt-decode";
import { crearMensaje } from "../../utilities/functions/mensajes";

export const Sesion = () => {
    /* Inicio: Lógica de negocio */

    type formulario = React.FormEvent<HTMLFormElement>;
    const [enProceso, setEnProceso] = useState<boolean>(false); // Encargada de la validación del formulario
    let {nombreAcceso, claveAcceso, dobleEnlace, objeto} = useFormulario<Acceso>(new Acceso(0,"", "")); // Instancia de la clase Acceso
    let navegacion = useNavigate(); // Hook para la navegación

    const enviarFormulario = async (frm:formulario) => {
        frm.preventDefault();
        setEnProceso(true);
        const objFrm = frm.currentTarget; // carga la interacción del formulario
        objFrm.classList.add("was-validated");
        if (objFrm.checkValidity() === false) {
            frm.preventDefault();
            frm.stopPropagation();
        } else {

            const cifrado = new jsSHA("SHA-512", "TEXT", {encoding: "UTF8"});
            const claveCifrar = cifrado.update(claveAcceso).getHash("HEX");
            objeto.claveAcceso = claveCifrar;

            const respuesta = await ServicioAcceso.iniciarSesion(objeto);

            const token = respuesta.response.tokenApp;

            /* Acá se sacan los datos */


            
            if (token) {
                const objRecibido: any = jwtDecode(token);
                const datosUsuario = new DatosSesion(
                objRecibido.id,
                objRecibido.nombre,
                objRecibido.rol,
                objRecibido.telefono,
                objRecibido.acceso);

                /* Mensaje Iniciaste Sesion */
                crearMensaje("success", "Bienvenido" + datosUsuario.nombre);
                localStorage.setItem("TOKEN_AUTORIZACION", token);
                navegacion("/dashboard");
                
            } else {
                switch (respuesta.status){
                case 400:
                    /* Mensaje usuario no registrado */
                    crearMensaje("error", "Usuario no registrado");
                    break;
                case 406:
                    /* Mensaje clave inválida */
                    crearMensaje("error", "Clave inválida");
                    break;
                default:
                    /* Fallo al realizar la autenticacion */
                    crearMensaje("error", "Fallo al realizar la autenticación");
                    break;
                }
            }
            setEnProceso(false);
            limpiarCajas(objFrm);
            
        }
    }

    const limpiarCajas = (formulario:HTMLFormElement) => {

        formulario.reset();
        objeto.nombreAcceso = "";
        objeto.claveAcceso = "";

        formulario.nombreAcceso.value="";
        formulario.claveAcceso.value="";

        formulario.classList.remove("was-validated");
    }

    /* Fin: Lógica de negocio */

    return (
        <section className="vh-lg-100 mt-5 mt-lg-0 bg-soft d-flex align-items-center">
            <div className="container-fluid">
                <div className="row justify-content-center form-bg-image" data-background-lg="../../assets/img/illustrations/signin.svg">
                    <div className="col-12 d-flex align-items-center justify-content-center">
                        <div className="bg-white shadow border-0 rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                            <div className="text-center text-md-center mb-4 mt-md-0">
                                <h1 className="mb-0 h1 fs-4 fst-italic">Sistema de Información Ubicaciones</h1>
                            </div>
                            <Form className="mt-4" validated={enProceso} onSubmit={enviarFormulario}>
                                <Form.Group controlId="nombreAcceso" className="mb-4">
                                    <Form.Label>
                                        <span className="rojito fs-4">* </span>&nbsp; Correo Electrónico
                                    </Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <i className='fa fa-envelope'></i>
                                        </InputGroup.Text>
                                        <Form.Control type="email" placeholder="example@company.com" name="nombreAcceso" value={nombreAcceso} onChange={dobleEnlace} autoFocus required/>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Group controlId="claveAcceso" className="mb-4">
                                        <Form.Label>
                                            <span className="rojito fs-4">* </span>&nbsp; Contraseña
                                        </Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <i className='fa fa-key'></i>
                                            </InputGroup.Text>
                                            <Form.Control type="password" placeholder="Password" name="claveAcceso" value={claveAcceso} onChange={dobleEnlace} required/>
                                        </InputGroup>
                                    </Form.Group>

                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100">
                                    Acceder
                                </Button>
                            </Form>

                            <div className="d-flex justify-content-center align-items-center mt-4">
                                <span className="fw-normal">
                                    No tienes una cuenta? &nbsp;
                                    <Link to="/register" className="fw-bold"> Click aquí</Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};