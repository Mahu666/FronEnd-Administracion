export class Taller {
    constructor(
        public nombreTaller: string,
        public imgPrincipal: string,
        public descripcion: string,
        public precio: string,
        public ubicacion: string,

        public status?: boolean,
        public sitio?: {ref: 'Sitio'},
        public talent?: {ref: 'Talent'},
        
        public _id?: string,
    ) {}
}