export class Usuario {
    constructor(
        public nombre: string,
        public apellidoPaterno: string,
        public apellidoMaterno: string,
        public email: string,
        public status: boolean,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public role?: 'ADMIN_ROLE' | 'USER_ROLE' | 'APAPACHADOR_ROLE' | 'TALENT_ROLE',
        public uid?: string,
    ) {}
}