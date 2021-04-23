import { Talent } from '../../models/talent.model';

export interface CargarTalento {
    total: number;
    talents: Talent[];
}

export interface BorrarTalento{
    uid: string;
}

export interface ActualizarTalento{
    uid: string;
}

export interface CargaTalentoById{    
    uid: any;
    talento: Talent[];
}
