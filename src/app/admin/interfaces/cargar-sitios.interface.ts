import { Sitio } from '../../models/sitio.model';

export interface CargarSitio {
    total: number;
    sitios: Sitio[];
}

export interface BorrarSitio{
    uid: string;
}

export interface ActualizarSitio{
    uid: string;
}

export interface CargaSitioById{    
    uid: any;
    sitio: Sitio[];
    horarioOpen: string[];
    horarioClose: string[];
}
