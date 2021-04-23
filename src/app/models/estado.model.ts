export class Estado {
    constructor(
        public nombreEstado: string,
        public status: boolean,
        public _id?: string,
        public pais?: {ref: 'Pais'}
    ) {}
}