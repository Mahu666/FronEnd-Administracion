import { Municipio } from '../../models/municipio.model';

export interface CargarMunicipio {
    total: number;
    municipios: Municipio[];
}

export interface BorrarMunicipio {
    uid: string;
}

export interface ActualizarMunicipio {
    uid: string;
}

export interface CargaMunicipioById {    
    uid: any;
    municipio: Municipio[];
}
