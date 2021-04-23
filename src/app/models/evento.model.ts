export class Evento {
    constructor(
        public nombreEvento: string,
        public imgPrincipal: string,
        public descripcion: string,
        public horario: string,
        public ubicacion: string,
        
        public status?: boolean,
        public sitio?: {ref: 'Sitio'},
        public talent?: {ref: 'Talent'},

        public _id?: string,
    ) {}
}