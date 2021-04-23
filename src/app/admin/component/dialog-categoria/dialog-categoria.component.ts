import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CategoriasService } from '../../services/categorias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-categoria',
  templateUrl: './dialog-categoria.component.html',
  styleUrls: ['./dialog-categoria.component.css']
})

export class DialogCategoriaComponent implements OnInit {

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

  public categoriaId: any;
  public texto: any;
  public btnTexto: any;
  public nombreC: any;
  public nombreD: any;
  public nombreS: any;
  public nombreCat: any;
  public nombreDes: any;
  public nombreSta: any;
  public status: any;
  public opcionSeleccionado: any;


  StatusSELE: boolean[] = [
    true, false
  ];

  selectedTipos: string[] = [
    'talento', 'apapachador'
  ];

  //#endregion

  //#region VALIDACIÓN INICIAL

  selected = (this.data == null) ? this.StatusSELE : this.data.Status;
  tipos = (this.data == null) ? this.selectedTipos : this.data.Tipo;

  //#endregion

  //#region CONSTRUCTOR

  constructor(public dialogRef: MatDialogRef<DialogCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private categoriasServices: CategoriasService,) {
    if (this.data == null) {
      this.texto = 'Crear Categoría';
      this.btnTexto = 'Guardar';
    } else {
      console.log(this.data.Status);
      console.log(this.data.Tipo);
      this.texto = 'Actualizar Categoría';
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

    this.nombreCat = this.nombreC;
    this.nombreDes = this.nombreD;

    if (this.nombreCat === undefined || this.nombreCat === '' || this.nombreCat === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El nombre de la categoría no debe estar vacío!',
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

    if (this.opcionSeleccionado === undefined) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El tipo no debe estar vacío!',
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

    else {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se ha creado exitosamente.',
        showConfirmButton: false,
        timer: 1000
      })
      this.categoriasServices.crearCategoria(this.nombreCat, this.nombreDes, this.selected, this.opcionSeleccionado).subscribe(resp => {
        this.dialogRef.close("Se ha creado correctamente");
        setTimeout(function () {
          window.location.reload()
        }, 1100)
      });
    }
  }


  save() {
    this.categoriaId = this.data._id;
    this.nombreC = this.data.NombreCategoria;
    this.nombreD = this.data.Descripcion;

    if (this.nombreC === undefined || this.nombreC === '' || this.nombreC === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El nombre de la categoría no debe estar vacío!',
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

    if (this.opcionSeleccionado === undefined) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El tipo no debe estar vacío!',
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
            this.categoriasServices.actualizarCategoria(this.categoriaId, this.nombreC, this.nombreD, this.selected, this.opcionSeleccionado).subscribe(resp => {
              this.dialogRef.close("Se ha actualizado correctamente");
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
