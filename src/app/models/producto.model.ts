export class Producto {
    constructor(
        public nombreProducto: string,
        public imgPrincipal: string,
        public descripcion: string,
        public precioActual: string,
        public precioAnterior: string,
        
        public status?: boolean,
        public sitio?: {ref: 'Sitio'},
        public talent?: {ref: 'Talent'},
        
        public _id?: string,
    ) {}
}