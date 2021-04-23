import { Evento } from '../../models/evento.model';

export interface CargarEvento {
    total: number;
    resultados: Evento[];
}

export interface BorrarEvento {
    uid: string;
}

export interface ActualizarEvento {
    uid: string;
}

export interface CargaEventoById {
    uid: any;
    evento: Evento[];
}
