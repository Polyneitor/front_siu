import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Sesion } from "../app/public/Sesion";
import { Registro } from "../app/public/Registro";
import { Error } from "../app/shared/Error";

const LazySesion = lazy(() => import('../app/public/Sesion').then(() => ({ default: Sesion })));
const LazyRegistro = lazy(() => import('../app/public/Registro').then(() => ({ default: Registro })));
const LazyError = lazy(() => import('../app/shared/Error').then(module => ({ default: Error })));

export const RuteoPrincipal = () => {

    return (
        <Routes>
            <Route path="/login" element={<LazySesion />} />
            <Route path="/register" element={<LazyRegistro />} />

            {/* Rutas oblgiatorias */}
            <Route path="/" element={<LazySesion />} />{/* Cambiarlo por un Inicio */}
            <Route path="*" element={<LazyError />} />
        </Routes>
    )
};