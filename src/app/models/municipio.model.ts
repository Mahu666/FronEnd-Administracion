export class Municipio {
    constructor(        
        public nombreMunicipio: string,
        public imgPrincipal: string,
        public historia: string,
        public imgHistoria: string,
        public videoHistoria: string,
        public tradiciones: string,
        public imgTradiciones: string,
        public videoTradiciones: string,
        public cultura: string,
        public imgCultura: string,
        public videoCultura: string,
        public clima: string,
        public ubicacion: string,

        public status: boolean,
        public _id?: string,
        public estado?: { ref: 'Estado' }
    ) { }
}