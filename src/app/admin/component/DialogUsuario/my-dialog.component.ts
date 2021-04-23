import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MAT_SELECT_CONFIG } from '@angular/material/select';
//import { url } from 'inspector';
import { environment } from 'src/environments/environment';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.css']
})
export class MyDialogComponent implements OnInit {

  //#region VARIABLES

  public userId: any;
  public nombre_: any;
  public email_: any;
  public img_: any;
  public google_: any;

  public texto: any;
  public txtFile: any;
  public btnTexto: any;

  public nombreN: any;
  public nombreI: any;
  public nombreS: any;
  public nombreG: any;
  public nombreE: any;
  public nombreP: any;
  public apellidoPat: any;
  public apellidoMat: any;

  public apellidoPaterno: any;
  public apellidoMaterno: any;

  public selectedFile!: File;

  public img_url = environment.img_url;
  public txtAccion: any;

  Roles: string[] = [
    'ADMIN_ROLE', 'USER_ROLE', 'APAPACHADOR_ROLE', 'TALENT_ROLE'
  ];

  StatusSELE: boolean[] = [
    true, false
  ];

  public tempImg: boolean = true;
  public tempImgCreate: boolean = true;
  public btnUpload: boolean = false;

  //#endregion

  //#region VALIDACIÓN INICIAL

  selectedSTA = (this.data == null) ? this.StatusSELE : this.data.Status;
  selected = (this.data == null) ? this.Roles : this.data.Rol;
  nombre = (this.data == null) ? '' : this.data.Nombre;
  status = (this.data == null) ? '' : this.data.Status;
  email = (this.data == null) ? '' : this.data.Email;
  img = (this.data == null) ? '' : this.data.Img;
  google = (this.data == null) ? '' : this.data.Google;
  password = (this.data == null) ? '' : this.data.Passowrd;

  //#endregion

  //#region  CONSTRUCTOR

  constructor(public dialogRef: MatDialogRef<MyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private usuariosServices: UsuariosService,) {

    if (this.data == null) {
      this.tempImg = false;
      this.tempImgCreate = true;
      this.texto = 'Crear Usuario';
      this.btnTexto = 'Guardar';
      this.txtFile = 'Seleccionar archivo'
    }
    else {
      this.tempImgCreate = false;
      this.btnTexto = 'Actualizar Usuario';
      if (this.img == null) {
        this.txtFile = 'Seleccionar archivo'
      }
      else {
        this.txtFile = 'Actualizar Imagen'
      }
    }
  }

  //#endregion

  //#region CARGA INICIAL

  ngOnInit(): void {

  }

  //#endregion

  //#region CARGA Y SUBIDA DE ARCHIVO

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile != null) {
      this.txtFile = this.selectedFile.name;
    }
    if (this.txtFile != 'Seleccionar archivo' || this.txtFile != 'Actualizar Imagen') {
      this.btnUpload = true;
    } else {
      this.btnUpload = false;
    }
  }

  async onUpload() {
    this.txtAccion = 'Subiendo imagen...';
    this.tempImg = false;
    this.tempImgCreate = false;
    const urlImg = `${this.img_url}/upload/perfil/usuarios`;
    const formData = new FormData();
    formData.append('imagen', this.selectedFile);
    const resp = await fetch(urlImg, {
      method: 'PUT',
      headers: {
        'x-token': localStorage.getItem('token') || ''
      },
      body: formData
    });
    const data = await resp.json();
    if (data.ok) {
      if (this.data == null) {
        this.txtAccion = 'Ok';
        this.tempImgCreate = true;
        this.tempImg = false;
        this.img = data.url;
        return data.url;
      } else {
        this.txtAccion = 'Ok'
        this.tempImg = true;
        this.tempImgCreate = false;
        this.img = data.url;
        return data.url;
      }
    } else {
      return false;
    }
  }

  //#endregion

  //#region MÉTODOS CREAR Y ACTUALIZAR

  create() {
    this.nombre_ = this.nombreN;
    this.apellidoPat = this.apellidoPaterno;
    this.apellidoMat = this.apellidoMaterno;
    this.email = this.nombreE;
    this.img = this.nombreI;
    this.google = this.nombreG;
    this.password = this.nombreP

    //console.log();
    this.usuariosServices.crearUsuario(this.nombre_, this.apellidoPat, this.apellidoMat, this.email, this.selectedSTA, this.password,
      this.img, this.google, this.selected).subscribe(resp => {
        this.dialogRef.close("Se ha creado correctamente");
        window.location.reload();
      });
  }

  save() {
    this.userId = this.data.Uid;
    this.nombre_ = this.data.Nombre;
    this.email = this.data.Email;
    this.google_ = this.data.Google;
    this.apellidoPaterno = this.data.ApellidoPaterno;
    this.apellidoMaterno = this.data.ApellidoMaterno;

    this.usuariosServices.actualizarUsuario(this.userId, this.nombre_, this.apellidoPaterno, this.apellidoMaterno, this.selectedSTA,
      this.selected, this.email, this.img, this.google_).subscribe(resp => {
        this.dialogRef.close("Se ha actualizado correctamente");
        window.location.reload();
      });
  }

  //#endregion

}
