export class Servicio {
    constructor(
        public nombreServicio: string,
        public iconoIonic: string,
        public iconoMaterial: string,
        public descripcion: string,
        public status: boolean,
        public _id?: string,
    ) {}
}
