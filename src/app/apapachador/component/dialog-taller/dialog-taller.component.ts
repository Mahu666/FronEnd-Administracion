import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { environment } from 'src/environments/environment';
import { TalleresService } from '../../services/talleres.service';

import { Sitio } from 'src/app/models/sitio.model';
import { SitiosService } from '../../services/sitios.service';

import { Talent } from 'src/app/models/talent.model';
import { TalentosService } from '../../services/talentos.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Taller } from 'src/app/models/taller.model';
import { ATallerDialogMapaComponent } from './dialog-mapa/dialog-mapa.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-taller',
  templateUrl: './dialog-taller.component.html',
  styleUrls: ['./dialog-taller.component.css']
})
export class ADialogTallerComponent implements OnInit {

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

  public _idUser?: string = '6005dfad07e0b004202b5e1d';

  public tallerId: any;

  public nombreTaller: any;
  public proImg: any;
  public descripcion: any;
  public precio: any;
  public ubicacion: any;

  public nombreTall: any;
  public talI: any;
  public desc: any;
  public prec: any;
  public ubic: any;
  public sit: any;

  public sitios: Sitio[] = [];
  public datosSitio: Sitio[] = [];
  Sitios: string[] = [
  ];

  public talentos: Talent[] = [];
  public datosTalent: Talent[] = [];
  Talentos: string[] = [
  ];

  StatusSELE: boolean[] = [
    true, false
  ];

  public labelTitulo: boolean = false;
  public selSitio: boolean = false;
  public selTalent: boolean = false;
  public chkSitio: boolean = true;
  public chkTalent: boolean = true;

  public rbtnSitio: boolean = true;
  public rbtnTalento: boolean = true;

  public btnUpload: boolean = false;
  public btnFileInput: boolean = true;

  public texto: any;
  public btnTexto: any;

  public txtAccionPri: any;
  public txtFilePri: any;
  public selectedFilePri!: File;
  public tempImg: boolean = true;
  public tempImgCreate: boolean = true;


  //#region MUCHAS IMAGENES

  imgs: string[] = [];
  public dto: any = [];
  opcionImgsElim: Taller[] = [];
  prueba: string[] = [];
  public idImgsSelect: any;
  public datosImgs: string[] = [];

  //#endregion

  public btnAddUbicacion: boolean = false;


  //#endregion

  //#region VALIDACIÓN INICIAL

  selectedSTA = (this.data == null) ? this.StatusSELE : this.data.Status;
  selectedSit = (this.data == null) ? this.datosSitio : this.data.Sitio;
  selectedTal = (this.data == null) ? this.datosTalent : this.data.Talent;

  imgPrincipal = (this.data == null) ? '' : this.data.ImgPrincipal;
  selectedImgs = (this.data == null) ? '' : this.dto;

  //#endregion

  //#region URL

  public img_url = environment.img_url;

  //#endregion

  //#region CONSTRUCTOR

  constructor(public dialogRef: MatDialogRef<ADialogTallerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private talleresServices: TalleresService, private sitiosServices: SitiosService,
    private talentosServices: TalentosService, public dialog: MatDialog) {
    if (this.data == null) {
      this.tempImg = false;
      this.tempImgCreate = true;
      this.texto = 'Crear Taller';
      this.btnTexto = 'Guardar';
      this.txtFilePri = 'Seleccionar archivo'
    } else {
      console.log(this.data);
      this.tempImgCreate = false;
      this.btnAddUbicacion = true;

      this.prueba = this.data.ImgPrincipal;
      this.texto = 'Actualizar Taller';
      this.btnTexto = 'Actualizar';
      if (this.imgPrincipal == null) {
        this.txtFilePri = 'Seleccionar archivo'
      } else {
        this.txtFilePri = 'Actualizar Imagen'
      }
    }
  }

  //#endregion

  //#region  CARGA INICIAL

  ngOnInit(): void {

    //#region SELECT SITIOS

    if (this.data == null) {
      this.sitiosServices.cargarSitio(0)
        .subscribe(resp => {
          this.datosSitio = resp.sitios;
        });
    } else {
      if (this.data != null) {
        this.sitiosServices.cargarSitio(0)
          .subscribe(resp => {
            this.datosSitio = resp.sitios;
            this.selectedSit = this.data.Sitio;
          });
      }
      if (this.data.Sitio !== undefined) {
        this.rbtnTalento = false;
      }
    }

    //#endregion

    //#region SELECT TALENTOS

    if (this.data == null) {
      this.talentosServices.cargarTalento(0)
        .subscribe(resp => {
          this.datosTalent = resp.talentos;
        });
    } else {
      if (this.data != null) {
        this.talentosServices.cargarTalento(0)
          .subscribe(resp => {
            this.datosTalent = resp.talentos;
            this.selectedTal = this.data.Talent;
          });
      }
      if (this.data.Talent !== undefined) {
        this.rbtnSitio = false;
      }
    }

    //#endregion

  }

  //#endregion

  //#region CARGA Y SUBIDA DE ARCHIVOS

  onFileChangedPrincipal(event: any) {
    this.selectedFilePri = event.target.files[0];
    if (this.selectedFilePri != null) {
      this.txtFilePri = this.selectedFilePri.name;
    }
    if (this.txtFilePri != 'Seleccionar archivo' || this.txtFilePri != 'Actualizar Imagen') {
      this.btnUpload = true;
    } else {
      this.btnUpload = false;
    }
  }

  async onUploadPrincipal() {
    this.txtAccionPri = 'Subiendo imagen...';
    this.tempImg = false;
    this.tempImgCreate = false;
    //***************************************URL TEMPORAL PARA PRUEBAS.***************************************
    const urlImg = `${this.img_url}/upload/perfil/usuarios/`;
    const formData = new FormData();
    formData.append('imagen', this.selectedFilePri);
    const resp = await fetch(urlImg, {
      method: 'PUT',
      headers: {
        'x-token': localStorage.getItem('token') || ''
      },
      body: formData
    });
    const data = await resp.json();
    console.log(data);
    if (data.ok) {
      if (this.data == null) {
        this.txtAccionPri = 'Ok';
        this.imgs.push(data.url);
        console.log('IMGS:', this.imgs);

        this.tempImgCreate = true;
        this.tempImg = false;
        this.imgPrincipal = data.url;
        return data.url;
      } else {
        this.txtAccionPri = 'Ok'
        this.data.ImgPrincipal.push(data.url);
        //this.imgs.push(data);
        console.log('IMGS:', this.data.ImgPrincipal);

        this.tempImg = true;
        this.tempImgCreate = false;
        this.imgPrincipal = data.url;
        return data.url;
      }
    } else {
      return false;
    }
  }

  //#endregion

  openDialogAsignarUbicacion(_id?: string) {
    if (_id == null) {
      _id = this.data._id
      this.talleresServices.cargarTallerById(_id).subscribe(resp => {
        //console.log(resp);
      })
    }
    const dialogRef = this.dialog.open(ATallerDialogMapaComponent, {
      height: '1000px',
      width: '1000px',
      data: {
        _id: _id,
      }
    });
  }


  //#region MÉTODOS CREAR Y ACTUALIZAR

  create() {

    this.nombreTall = this.nombreTaller;
    //imgPrincipal  sitImg

    this.desc = this.descripcion;
    this.prec = this.precio;
    this.ubic = this.ubicacion;

    if (this.nombreTall === undefined || this.nombreTall === '' || this.nombreTall === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El nombre del Taller no debe estar vacío!',
      })
      return;
    }

    if (this.prec === undefined || this.prec === '' || this.nombreTall === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El precio no debe estar vacío!',
      })
      return;
    }

    if (this.selectedSTA === this.StatusSELE) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El status no debe estar vacío!',
      })
      return;
    }

    if (Object.entries(this.imgs).length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La imagen principal no debe estar vacía!',
      })
      return;
    }

    if (this.desc === undefined || this.desc === '' || this.desc === null) {
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
      if (this.selectedSit !== null && this.selectedTal.length === 0) {
        this.talleresServices.crearTaller(this.nombreTall, this.imgs, this.desc, this.prec, this.ubic,
          this.selectedSTA, this.selectedSit, undefined).subscribe(resp => {
            setTimeout(function () {
              window.location.reload()
            }, 1000)
          });
      }
      else {
        this.talleresServices.crearTaller(this.nombreTall, this.imgPrincipal, this.desc, this.prec, this.ubic,
          this.selectedSTA, undefined, this.selectedTal).subscribe(resp => {
            setTimeout(function () {
              window.location.reload()
            }, 1000)
          });
      }
    }

  }

  save() {

    this.tallerId = this.data._id;

    this.nombreTall = this.data.NombreTaller;
    this.imgPrincipal = this.data.ImgPrincipal;
    //imgPrincipal  sitImg
    this.desc = this.data.Descripcion;
    this.prec = this.data.Precio;
    this.ubic = this.data.Ubicacion;

    if (this.nombreTall === undefined || this.nombreTall === '' || this.nombreTall === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El nombre del Taller no debe estar vacío!',
      })
      return;
    }

    if (this.prec === undefined || this.prec === '' || this.nombreTall === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El precio no debe estar vacío!',
      })
      return;
    }

    if (this.selectedSTA === this.StatusSELE) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El status no debe estar vacío!',
      })
      return;
    }

    if (Object.entries(this.imgPrincipal).length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La imagen principal no debe estar vacía!',
      })
      return;
    }

    if (this.desc === undefined || this.desc === '' || this.desc === null) {
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
            if (this.selectedSit !== null && this.selectedTal === undefined) {
              //this.selectedSit = this.data.Sitio;
              this.talleresServices.actualizarTaller(this.nombreTall, this.imgPrincipal, this.desc, this.prec, this.ubic,
                this.selectedSTA, this.selectedSit, undefined, this.tallerId).subscribe(resp => {
                  setTimeout(function () {
                    window.location.reload()
                  }, 1000)
                });
            } else {
              this.talleresServices.actualizarTaller(this.nombreTall, this.imgPrincipal, this.desc, this.prec, this.ubic,
                this.selectedSTA, undefined, this.selectedTal, this.tallerId).subscribe(resp => {
                  setTimeout(function () {
                    window.location.reload()
                  }, 1000)
                });
            }
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

  validarSIT() {

    if (this.chkSitio == true) {
      this.chkSitio = true;
      this.selSitio = true;
      this.selTalent = false;
    }

  }

  validarTAL() {

    if (this.chkTalent == true) {
      this.chkTalent = true;
      this.selSitio = false;
      this.selTalent = true;
    }

  }

  eliminarImagen() {

    this.idImgsSelect = this.opcionImgsElim;
    console.log(this.idImgsSelect);

    const inde = this.datosImgs.indexOf(this.idImgsSelect)
    this.datosImgs.splice(inde, 1);
    this.prueba.splice(inde, 1);
    console.log(this.datosImgs);
  }
  //#endregion
}
