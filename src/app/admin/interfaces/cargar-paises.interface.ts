import { Pais } from '../../models/paises.model';

export interface CargarPais {
    total: number;
    paises: Pais[];
}

export interface BorrarPais{
    _id: string;
}

export interface ActualizarPais{
    _id: string;
}

export interface CargaPaisById{    
    _id: any;
    paises: Pais[];
}
