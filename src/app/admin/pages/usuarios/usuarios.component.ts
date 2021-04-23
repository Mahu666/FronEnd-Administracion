import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from '../../services/usuarios.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyDialogComponent } from 'src/app/admin/component/DialogUsuario/my-dialog.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})

export class UsuariosComponent implements AfterViewInit {

  //#region VARIABLES

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuarioById: Usuario[] = [];
  public byId: any;
  public userModal = {};
  public pagina: any = 0;
  public totalUser: any = 0;

  public est: number = 0;
  public mostrarPaginaPrev: any = 1;

  //#endregion

  //#region CONSTRUCTOR

  constructor(private usuariosServices: UsuariosService, public dialog: MatDialog) { }

  //#endregion

  //#region CARGA PRINCIPAL

  ngOnInit(): void {
    this.usuariosServices.cargarUsuarios(this.pagina)
      .subscribe(resp => {
        this.totalUsuarios = resp.total;
        this.est = resp.usuarios.length;
        this.usuarios = resp.usuarios;
        this.dataSource = new MatTableDataSource<Usuario>(this.usuarios);
        this.totalUser = resp.total;
        this.dataSource.paginator = this.paginator;
      })
  }

  //#endregion

  //#region BOTONES PAGINADO

  inc() {
    this.pagina += 5;
    this.mostrarPaginaPrev += 5;
    this.est += 5;

    if (this.pagina >= (this.totalUsuarios)) {
      this.pagina -= 5;
      this.mostrarPaginaPrev -= 5;
      this.est -= 5;
    }

    this.usuariosServices.cargarUsuarios(this.pagina)
      .subscribe(resp => {
        this.totalUsuarios = resp.total;
        this.usuarios = resp.usuarios;
        this.dataSource = new MatTableDataSource<Usuario>(this.usuarios);
        this.totalUser = resp.total;
      })
  }

  dec() {
    this.pagina -= 5;
    this.mostrarPaginaPrev -= 5;

    this.usuariosServices.cargarUsuarios(this.pagina)
      .subscribe(resp => {
        this.totalUsuarios = resp.total;
        this.usuarios = resp.usuarios;
        this.est -= 5;
        this.dataSource = new MatTableDataSource<Usuario>(this.usuarios);
        this.totalUser = resp.total;
      })
    if (this.pagina < 0) {
      this.pagina = 0;
      this.mostrarPaginaPrev = 1;
    }
  }

  //#endregion

  //#region MODAL

  openDialog(uid: any, nombre: any, apellidoPaterno: any, apellidoMaterno: any, role: 'ADMIN_ROLE' | 'USER_ROLE' | 'APAPACHADOR_ROLE',
    status: boolean, email: string, img?: string, google?: any): void {
    if (uid != null) {
      this.byId = uid;
      this.usuariosServices.cargarUsuarioId(this.byId).subscribe(resp => {
        this.dataSource = new MatTableDataSource<Usuario>(this.usuarios);
      })
      const dialogRef = this.dialog.open(MyDialogComponent, {
        height: '670px',
        width: '900px',
        data: {
          Uid: uid,
          Nombre: nombre,
          ApellidoPaterno: apellidoPaterno,
          ApellidoMaterno: apellidoMaterno,
          Rol: role,
          Status: status,
          Email: email,
          Img: img,
          Google: google
        }
      });
    }
  }

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(MyDialogComponent, {
      height: '670px',
      width: '900px',
    });
  }

  //#endregion

  //#region METODOS PRINCIPALES BY ID

  obtenerById(uid: any): void {
    this.byId = uid;
    this.usuariosServices.cargarUsuarioId(this.byId)
      .subscribe(resp => {
        this.dataSource = new MatTableDataSource<Usuario>(this.usuarios);
      })
  }

  BorrarId(uid: any) {
    if (confirm('Seguro que desea eliminar?')) {
      this.usuariosServices.borrarUsuarios(uid).subscribe(resp => {
        this.dataSource = new MatTableDataSource<Usuario>(this.usuarios);
        window.location.reload();
      })
    }
  }

  //#endregion

  //#region FORMATO DE TABLA DINÁMICA

  displayedColumns: string[] = ['nombre', 'apellidoPaterno', 'apellidoMaterno', 'email', 'role', 'status', 'acciones'];
  dataSource = new MatTableDataSource<Usuario>(ELEMENT_DATA);

  columnas = [
    { titulo: "Nombre", name: "nombre" },
    { titulo: "Apellido Paterno", name: "apellidoPaterno" },
    { titulo: "Apellido Materno", name: "apellidoMaterno" },
    { titulo: "Email", name: "email" },
    { titulo: "Rol", name: "role" },
    { titulo: "Estado", name: "status" },

    { titulo: "Acciones", name: "acciones" },
  ];

  //#endregion

  //#region  FILTRADO POR TEXTO

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  //#endregion

}

//#region ELEMENT_DATA

const ELEMENT_DATA: Usuario[] = [
  //Se tiene que enviar sin datos.
];

//#endregion
