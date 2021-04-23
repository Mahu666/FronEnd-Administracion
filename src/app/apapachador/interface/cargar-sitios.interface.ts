import { Sitio } from '../../models/sitio.model';

export interface CargarSitioByUsuario {
    total: number;
    resultados: Sitio[];
}

export interface BorrarSitio {
    uid: string;
}

export interface ActualizarSitio {
    uid: string;
}

export interface CargaSitioById {
    uid: any;
    sitio: Sitio[];
    servicios: string[];
    horarioOpen: string[];
    horarioClose: string[];
}
