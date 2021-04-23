import { Estado } from '../../models/estado.model';

export interface CargarEstado {
    total: number;
    estados: Estado[];
}

export interface BorrarEstado{
    uid: string;
}

export interface ActualizarEstado{
    uid: string;
}

export interface CargaEstadoById{    
    uid: any;
    estado: Estado[];
}
