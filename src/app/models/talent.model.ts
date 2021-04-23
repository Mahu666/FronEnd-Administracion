export class Talent {
    constructor(
        public nombreTalent: string,
        public imgPrincipal: string,
        public descripcion: string,
        public video: string,

        public nombreContacto1: string,
        public telContacto1: string,
        public correoContacto1: string,

        public nombreContacto2: string,
        public telContacto2: string,
        public correoContacto2: string,

        public ubicacion: string,
        public licencia: Date,
        public facebook: string,
        public instagram: string,
        public sitioWeb: string,

        public categoria: { ref: 'Categoria' },
        public usuario: { ref: 'Usuario' },
        public municipio: { ref: 'Municipio' },

        public status: boolean,
        public _id?: string,
    ) { }
}
