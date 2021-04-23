import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { environment } from 'src/environments/environment';
import { TalentosService } from '../../services/talentos.service';

import { Categoria } from 'src/app/models/categoria.model';
import { CategoriasService } from '../../services/categorias.service';

import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from '../../services/usuarios.service';

import { Municipio } from 'src/app/models/municipio.model';
import { MunicipiosService } from '../../services/municipios.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Talent } from 'src/app/models/talent.model';
import { TalentDialogMapaComponent } from './dialog-mapa/dialog-mapa.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-talent',
  templateUrl: './dialog-talent.component.html',
  styleUrls: ['./dialog-talent.component.css']
})
export class DialogTalentComponent implements OnInit {

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

  public talentoId: any;

  public nombreTalent: any;
  public talImg: any;
  public descripcion: any;
  public video: any;

  public nombreContacto1: any;
  public telContacto1: any;
  public correoContacto1: any;

  public nombreContacto2: any;
  public telContacto2: any;
  public correoContacto2: any;

  public ubicacion: any;
  //************************************************* licencia ES TIPO DATE EN MODEL API **************************************************
  public licencia: any;


  public nombreTal: any;
  public talI: any;
  public desc: any;
  public vid: any;

  public nombreCont1: any;
  public telCont1: any;
  public correoCont1: any;

  public nombreCont2: any;
  public telCont2: any;
  public correoCont2: any;

  public ubi: any;
  //************************************************* licencia ES TIPO DATE EN MODEL API **************************************************
  public lice: any;
  public facebook: any;
  public instagram: any;
  public sitioWeb: any;


  public categorias: Categoria[] = [];
  public datosCategoria: Categoria[] = [];
  Categorias: string[] = [
  ];

  public usuarios: Usuario[] = [];
  public datosUsuario: Usuario[] = [];
  Usuarios: string[] = [
  ];

  public municipios: Municipio[] = [];
  public datosMunicipio: Municipio[] = [];
  Municipios: string[] = [
  ];

  StatusSELE: boolean[] = [
    true, false
  ];

  public texto: any;
  public btnTexto: any;

  public txtAccionPri: any;
  public txtFilePri: any;
  public selectedFilePri!: File;
  public tempImg: boolean = true;
  public tempImgCreate: boolean = true;
  public btnUpload: boolean = false;

  public fb: any;
  public ins: any;
  public sWeb: any;

  //#region MUCHAS IMAGENES

  imgs: string[] = [];
  public dto: any = [];
  opcionImgsElim: Talent[] = [];
  prueba: string[] = [];
  public idImgsSelect: any;
  public datosImgs: string[] = [];
  public crdImg: boolean = false;
  //#endregion

  public btnAddUbicacion: boolean = false;


  //#endregion

  //#region VALIDACIÓN INICIAL

  selectedSTA = (this.data == null) ? this.StatusSELE : this.data.Status;
  selectedCat = (this.data == null) ? this.datosCategoria : this.data.Categoria;
  selectedUsu = (this.data == null) ? this.datosUsuario : this.data.Usuario;
  selectedMun = (this.data == null) ? this.datosMunicipio : this.data.Municipio;

  imgPrincipal = (this.data == null) ? '' : this.data.ImgPrincipal;
  selectedImgs = (this.data == null) ? '' : this.dto;

  //#endregion

  //#region URL

  public img_url = environment.img_url;

  //#endregion

  //#region CONSTRUCTOR

  constructor(public dialogRef: MatDialogRef<DialogTalentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private talentosServices: TalentosService, private municipiosServices: MunicipiosService,
    private categoriasServices: CategoriasService, private usuariosServices: UsuariosService, public dialog: MatDialog) {
    if (this.data == null) {
      this.tempImg = false;
      this.tempImgCreate = true;
      this.texto = 'Crear Talento';
      this.btnTexto = 'Guardar';
      this.txtFilePri = 'Seleccionar archivo'
    } else {
      console.log(this.data);
      this.tempImgCreate = false;
      this.crdImg = true;
      this.prueba = this.data.ImgPrincipal;
      this.btnAddUbicacion = true;
      this.texto = 'Actualizar Talento';
      this.btnTexto = 'Actualizar';
      if (this.imgPrincipal == null) {
        this.txtFilePri = 'Seleccionar archivo'
      } else {
        this.txtFilePri = 'Actualizar Imagen'
      }
    }
  }

  //#endregion

  //#region CARGA INICIAL

  ngOnInit(): void {

    //#region SELECT CATEGORIA

    if (this.data == null) {
      this.categoriasServices.cargarCategorias(0)
        .subscribe(resp => {
          this.datosCategoria = resp.categorias;
        });
    } else {
      if (this.data != null) {
        this.categoriasServices.cargarCategorias(0)
          .subscribe(resp => {
            this.datosCategoria = resp.categorias;
            this.selectedCat = this.data.Categoria;
          });
      }
    }

    //#endregion

    //#region SELECT USUARIO

    if (this.data == null) {
      this.usuariosServices.cargarUsuarios(0)
        .subscribe(resp => {
          this.datosUsuario = resp.usuarios;
        });
    } else {
      if (this.data != null) {
        this.usuariosServices.cargarUsuarios(0)
          .subscribe(resp => {
            this.datosUsuario = resp.usuarios;
            this.selectedUsu = this.data.Usuario;
          });
      }
    }

    //#endregion

    //#region SELECT MUNICIPIO

    if (this.data == null) {
      this.municipiosServices.cargarMunicipio(0)
        .subscribe(resp => {
          this.datosMunicipio = resp.municipios;
        });
    } else {
      if (this.data != null) {
        this.municipiosServices.cargarMunicipio(0)
          .subscribe(resp => {
            this.datosMunicipio = resp.municipios;
            this.selectedMun = this.data.Municipio;
          });
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
    //URL TEMPORAL PARA PRUEBAS.
    this.tempImg = false;
    this.tempImgCreate = false;
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
      this.talentosServices.cargarTalentoById(_id).subscribe(resp => {
        //console.log(resp);
      })
    }
    const dialogRef = this.dialog.open(TalentDialogMapaComponent, {
      height: '1000px',
      width: '1000px',
      data: {
        _id: _id,
      }
    });
  }

  //#region MÉTODOS CREAR Y ACTUALIZAR

  create() {

    this.nombreTal = this.nombreTalent;
    //imgPrincipal  sitImg
    this.desc = this.descripcion;
    this.vid = this.video;

    this.nombreCont1 = this.nombreContacto1;
    this.telCont1 = this.telContacto1;
    this.correoCont1 = this.correoContacto1;

    this.nombreCont2 = this.nombreContacto2;
    this.telCont2 = this.telContacto2;
    this.correoCont2 = this.correoContacto2;

    this.ubi = this.ubicacion;
    this.lice = this.licencia;
    this.fb = this.facebook;
    this.ins = this.instagram;
    this.sWeb = this.sitioWeb;


    if (this.nombreTal === undefined || this.nombreTal === '' || this.nombreTal === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El nombre del Talento no debe estar vacío!',
      })
      return;
    }

    if (Object.entries(this.selectedCat).length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La Categoría no debe estar vacía!',
      })
      return;
    }

    if (Object.entries(this.selectedUsu).length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El Usuario no debe estar vacío!',
      })
      return;
    }

    if (Object.entries(this.selectedMun).length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El Municipio no debe estar vacío!',
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

    if (this.nombreCont1 === undefined || this.nombreCont1 === '' || this.nombreCont1 === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El nombre del Contacto 1 no debe estar vacío!',
      })
      return;
    }

    if (this.telCont1 === undefined || this.telCont1 === '' || this.telCont1 === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El Teléfono del Contacto 1 no debe estar vacío!',
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

    else {

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se ha creado exitosamente.',
        showConfirmButton: false,
        timer: 1000
      })
      this.talentosServices.crearTalento(this.nombreTal, this.imgs, this.desc, this.vid, this.nombreCont1, this.telCont1, this.correoCont1,
        this.nombreCont2, this.telCont2, this.correoCont2, this.ubi, this.lice, this.fb, this.ins, this.sWeb, this.selectedCat, this.selectedUsu,
        this.selectedMun, this.selectedSTA).subscribe(resp => {
          setTimeout(function () {
            window.location.reload()
          }, 1100)
        });
    }

  }

  save() {

    this.talentoId = this.data._id;

    this.nombreTal = this.data.NombreTalent;
    this.talImg = this.data.ImgPrincipal;
    this.desc = this.data.Descripcion;
    this.vid = this.data.Video;

    this.nombreCont1 = this.data.NombreContacto1;
    this.telCont1 = this.data.TelContacto1;
    this.correoCont1 = this.data.CorreoContacto1;

    this.nombreCont2 = this.data.NombreContacto2;
    this.telCont2 = this.data.TelContacto2;
    this.correoCont2 = this.data.CorreoContacto2;

    this.ubi = this.data.Ubicacion;
    this.lice = this.data.Licencia;
    this.fb = this.data.Facebook;
    this.ins = this.data.Instagram;
    this.sWeb = this.data.SitioWeb;


    if (this.nombreTal === undefined || this.nombreTal === '' || this.nombreTal === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El nombre del Talento no debe estar vacío!',
      })
      return;
    }

    if (Object.entries(this.selectedCat).length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La Categoría no debe estar vacía!',
      })
      return;
    }

    if (Object.entries(this.selectedUsu).length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El Usuario no debe estar vacío!',
      })
      return;
    }

    if (Object.entries(this.selectedMun).length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El Municipio no debe estar vacío!',
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

    if (this.nombreCont1 === undefined || this.nombreCont1 === '' || this.nombreCont1 === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El nombre del Contacto 1 no debe estar vacío!',
      })
      return;
    }

    if (this.telCont1 === undefined || this.telCont1 === '' || this.telCont1 === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El Teléfono del Contacto 1 no debe estar vacío!',
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
            this.talentosServices.actualizarTalento(this.nombreTal, this.talImg, this.desc, this.vid, this.nombreCont1, this.telCont1, this.correoCont1,
              this.nombreCont2, this.telCont2, this.correoCont2, this.ubi, this.lice, this.fb, this.ins, this.sWeb, this.selectedCat, this.selectedUsu,
              this.selectedMun, this.selectedSTA, this.talentoId).subscribe(resp => {
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
