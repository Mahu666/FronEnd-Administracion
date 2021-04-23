import { Categoria } from '../../models/categoria.model';

export interface CargarCategoria {
    total: number;
    categoria: Categoria[];
}

export interface BorrarCategoria {
    uid: string;
}

export interface ActualizarCategoria {
    uid: string;
}

export interface CargaCategoriaById {    
    uid: any;
    categorias: Categoria[];
}