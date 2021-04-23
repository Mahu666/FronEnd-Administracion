import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ServiciosService } from '../../services/servicios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-servicio',
  templateUrl: './dialog-servicio.component.html',
  styleUrls: ['./dialog-servicio.component.css']
})

export class DialogServicioComponent implements OnInit {

  //#region FORMATO ANGULAR-EDITOR

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'indent',
        'outdent',],
      ['insertImage',
        'insertVideo',]
    ]
  };

  //#endregion

  //#region VARIABLES

  public servicioId: any;
  public texto: any;
  public btnTexto: any;
  public nombreSE: any;
  public nombreII: any;
  public nombreIM: any;
  public nombreD: any;
  public nombreS: any;

  public nombreSer: any;
  public nombreIconI: any;
  public nombreIconM: any;
  public nombreDes: any;
  public nombreSta: any;

  StatusSELE: boolean[] = [
    true, false
  ];

  //#endregion

  //#region VALIDACIÓN INICIAL

  selected = (this.data == null) ? this.StatusSELE : this.data.Status;

  //#endregion

  //#region CONSTRUCTOR

  constructor(public dialogRef: MatDialogRef<DialogServicioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private serviciosServices: ServiciosService,) {
    if (this.data == null) {
      this.texto = 'Crear Servicio';
      this.btnTexto = 'Guardar';
    } else {
      this.texto = 'Actualizar Servicio';
      this.btnTexto = 'Actualizar';
    }
  }

  //#endregion

  //#region CARGA INICIAL

  ngOnInit(): void {

  }

  //#endregion

  //#region MÉTODOS CREAR Y ACTUALIZAR

  create() {
    this.nombreSer = this.nombreSE;
    this.nombreIconI = this.nombreII;
    this.nombreIconM = this.nombreIM;
    this.nombreDes = this.nombreD;

    if (this.nombreSer === undefined || this.nombreSer === '' || this.nombreSer === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El nombre del Servicio no debe estar vacío!',
      })
      return;
    }

    if (this.nombreIconI === undefined || this.nombreIconI === '' || this.nombreIconI === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El nombre del Icono Ionic no debe estar vacío!',
      })
      return;
    }

    if (this.nombreIconM === undefined || this.nombreIconM === '' || this.nombreIconM === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El nombre del Icono Material no debe estar vacío!',
      })
      return;
    }

    if (this.nombreDes === undefined || this.nombreDes === '' || this.nombreDes === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La descripción no debe estar vacía!',
      })
      return;
    }

    if (this.selected === this.StatusSELE) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El status no debe estar vacío!',
      })
      return;
    }

    else {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se ha creado exitosamente.',
        showConfirmButton: false,
        timer: 1000
      })
      this.serviciosServices.crearServicio(this.nombreSer, this.nombreDes, this.nombreIconI,
        this.nombreIconM, this.selected).subscribe(resp => {
          setTimeout(function () {
            window.location.reload()
          }, 1100)
        });
    }
  }

  save() {
    this.servicioId = this.data._id;
    this.nombreSE = this.data.NombreServicio;
    this.nombreD = this.data.Descripcion;
    this.nombreII = this.data.IconoIonic;
    this.nombreIM = this.data.IconoMaterial;


    if (this.nombreSE === undefined || this.nombreSE === '' || this.nombreSE === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El nombre del Servicio no debe estar vacío!',
      })
      return;
    }

    if (this.nombreII === undefined || this.nombreII === '' || this.nombreII === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El nombre del Icono Ionic no debe estar vacío!',
      })
      return;
    }

    if (this.nombreIM === undefined || this.nombreIM === '' || this.nombreIM === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El nombre del Icono Material no debe estar vacío!',
      })
      return;
    }

    if (this.selected === this.StatusSELE) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El status no debe estar vacío!',
      })
      return;
    }

    if (this.nombreD === undefined || this.nombreD === '' || this.nombreD === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La descripción no debe estar vacía!',
      })
      return;
    }

    else {
      Swal.fire({
        title: 'Seguro que desea actualizar?',
        //text: 'Se actualizará el registro.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, actualizalo!',
        cancelButtonText: 'No!',
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Actualizado',
            'Tu registro se ha actualizado.',
            'success',
          )
          if (result.isConfirmed) {
            this.serviciosServices.actualizarServicio(this.servicioId, this.nombreSE, this.nombreD, this.nombreII,
              this.nombreIM, this.selected).subscribe(resp => {
              });
            setTimeout(function () {
              window.location.reload()
            }, 1000)
          }

        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelado',
            'Tu registro está seguro',
            'error'
          )
        }
      })
    }

  }

  //#endregion

}
