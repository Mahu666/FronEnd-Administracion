import { Usuario } from '../../models/usuario.model';

export interface CargarUsuario {
    total: number;
    usuarios: Usuario[];
}

export interface BorrarUsuario{
    uid: string;
}

export interface ActualizarUsuario{
    uid: string;
}

export interface CargaUsuarioId{    
    uid: any;
    usuarios: Usuario[];
}
