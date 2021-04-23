export class Categoria {
    constructor(
        public nombreCategoria: string,
        public descripcion: string,
        public status: boolean,
        public tipo: string,
        public _id?: string,
    ) {}
}