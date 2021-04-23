import { Producto } from '../../models/producto.model';

export interface CargarProducto {
    total: number;
    productos: Producto[];
}

export interface BorrarProducto{
    uid: string;
}

export interface ActualizarProducto{
    uid: string;
}

export interface CargaProductoById{    
    uid: any;
    producto: Producto[];
}
