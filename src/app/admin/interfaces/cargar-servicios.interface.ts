import { Servicio } from '../../models/servicio.model';

export interface CargarServicio {
    total: number;
    servicios: Servicio[];
}

export interface BorrarServicio{
    uid: string;
}

export interface ActualizarServicio {
    uid: string;
}

export interface CargaServicioById {    
    uid: any;
    servicio: Servicio[];    
}