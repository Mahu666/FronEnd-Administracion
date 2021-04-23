export class Sitio {
    constructor(
        public nombreSitio: string,
        public imgPrincipal: string,
        public video: string,
        public descripcion: string,
        public banner: string,

        public nombreContacto1: string,
        public telContacto1: string,
        public correoContacto1: string,

        public nombreContacto2: string,
        public telContacto2: string,
        public correoContacto2: string,

        public servicios: string[],
        public horarioOpen: string[],
        public horarioClose: string[],
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
