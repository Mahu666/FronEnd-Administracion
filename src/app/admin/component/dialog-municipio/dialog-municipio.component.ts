import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { Console } from 'console';
import { Estado } from 'src/app/models/estado.model';
import { Municipio } from 'src/app/models/municipio.model';

import { environment } from 'src/environments/environment';
import { EstadosService } from '../../services/estados.service';
import { MunicipiosService } from '../../services/municipios.service';
import { DialogMapaComponent } from './dialog-mapa/dialog-mapa.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dialog-municipio',
  templateUrl: './dialog-municipio.component.html',
  styleUrls: ['./dialog-municipio.component.css']
})

//.*********************************************** A TENER EN CUENTA.***********************************************
//.***********************************************selectedFile PARA CADA UNA DE LAS IMAGENES? HECHO***********************************************
export class DialogMunicipioComponent implements OnInit {

  //#region VARIABLES

  public tempImg: boolean = true;
  public muniId: any;
  public nombreMunicipio: any;
  public munI: any;
  public historia: any;
  public munIH: any;
  public videoHistoria: any;
  public tradiciones: any;
  public munIT: any;
  public videoTradiciones: any;
  public cultura: any;
  public munIC: any;
  public videoCultura: any;
  public clima: any;
  public ubicacion: any;

  public nombreMun: any;
  public his: any;
  public videoHis: any;
  public trad: any;
  public videoTrad: any;
  public cult: any;
  public videoCult: any;
  public cli: any;
  public ubic: any;

  public estados: Estado[] = [];
  public datosEstado: Estado[] = [];
  Estados: string[] = [
  ];
  StatusSELE: boolean[] = [
    true, false
  ];

  public texto: any;
  public btnTexto: any;

  public txtAccionPri: any;
  public txtFilePri: any;

  public txtAccionCul: any;
  public txtFileCul: any;

  public txtAccionHis: any;
  public txtFileHis: any;

  public txtAccionTra: any;
  public txtFileTra: any;

  public selectedFilePri!: File;
  public selectedFileCul!: File;
  public selectedFileHis!: File;
  public selectedFileTra!: File;
  public tempImgCreate: boolean = true;

  public btnImgPrincipal: boolean = false;
  public btnImgHistoria: boolean = false;
  public btnImgTradicion: boolean = false;
  public btnImgCultura: boolean = false;


  //#region MUCHAS IMAGENES
  //*************PRINCIPAL********** */
  imgsP: string[] = [];
  public dtoP: any = [];
  opcionImgsElimP: Municipio[] = [];
  pruebaP: string[] = [];
  public idImgsSelectP: any;
  public datosImgsP: string[] = [];
  public crdImgP: boolean = false;
  //************HISTORIA******** */
  imgsH: string[] = [];
  public dtoH: any = [];
  opcionImgsElimH: Municipio[] = [];
  pruebaH: string[] = [];
  public idImgsSelectH: any;
  public datosImgsH: string[] = [];

  //************TRADICIÓN******** */
  imgsT: string[] = [];
  public dtoT: any = [];
  opcionImgsElimT: Municipio[] = [];
  pruebaT: string[] = [];
  public idImgsSelectT: any;
  public datosImgsT: string[] = [];

  //************CULTURA******** */
  imgsC: string[] = [];
  public dtoC: any = [];
  opcionImgsElimC: Municipio[] = [];
  pruebaC: string[] = [];
  public idImgsSelectC: any;
  public datosImgsC: string[] = [];

  //#endregion

  public btnAddUbicacion: boolean = false;

  //#endregion

  //#region VALIDACIÓN INICIAL

  selectedSTA = (this.data == null) ? this.StatusSELE : this.data.Status;
  selected = (this.data == null) ? this.datosEstado : this.data.Estado.nombreEstado;
  //selected = (this.data == null) ? this.datosEstado : this.data.Pais.nombrePais;

  imgPrincipal = (this.data == null) ? '' : this.data.ImgPrincipal;
  //img = (this.data == null) ? '' : this.data.Img;
  imgHistoria = (this.data == null) ? '' : this.data.ImgHistoria;
  imgTradiciones = (this.data == null) ? '' : this.data.ImgTradiciones;
  imgCultura = (this.data == null) ? '' : this.data.ImgCultura;

  selectedImgsP = (this.data == null) ? '' : this.dtoP;
  selectedImgsH = (this.data == null) ? '' : this.dtoH;
  selectedImgsT = (this.data == null) ? '' : this.dtoT;
  selectedImgsC = (this.data == null) ? '' : this.dtoC;

  //#endregion

  //#region URL

  public img_url = environment.img_url;

  //#endregion

  //#region CONSTRUCTOR

  constructor(public dialogRef: MatDialogRef<DialogMunicipioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private municipiosServices: MunicipiosService, private estadosService: EstadosService, public dialog: MatDialog) {
    if (this.data == null) {
      this.tempImg = false;
      this.tempImgCreate = true;
      this.texto = 'Crear Municipio';
      this.btnTexto = 'Guardar';
      this.txtFilePri = 'Seleccionar archivo'
      this.txtFileCul = 'Seleccionar archivo'
      this.txtFileHis = 'Seleccionar archivo'
      this.txtFileTra = 'Seleccionar archivo'
    } else {
      console.log(this.data);
      this.tempImgCreate = false;
      this.btnAddUbicacion = true;
      this.crdImgP = true;

      this.pruebaP = this.data.ImgPrincipal;
      this.pruebaH = this.data.ImgHistoria;
      this.pruebaT = this.data.ImgTradiciones;
      this.pruebaC = this.data.ImgCultura;

      this.texto = 'Actualizar Municipio';
      this.btnTexto = 'Actualizar';
      if (this.imgPrincipal == null) {
        this.txtFilePri = 'Seleccionar archivo'
      }
      else {
        this.txtFilePri = 'Actualizar Imagen'
      }
      if (this.imgHistoria == null) {
        this.txtFileHis = 'Seleccionar archivo'
      }
      else {
        this.txtFileHis = 'Actualizar Imagen'
      }
      if (this.imgTradiciones == null) {
        this.txtFileTra = 'Seleccionar archivo'
      }
      else {
        this.txtFileTra = 'Actualizar Imagen'
      }
      if (this.imgCultura == null) {
        this.txtFileCul = 'Seleccionar archivo'
      }
      else {
        this.txtFileCul = 'Actualizar Imagen'
      }
    }
  }

  //#endregion

  //#region CARGA INICIAL

  ngOnInit(): void {
    if (this.data == null) {
      this.estadosService.cargarTotalEstados()
        .subscribe(resp => {
          this.datosEstado = resp.estados;
        });
    } else {
      if (this.data != null) {
        this.estadosService.cargarTotalEstados()
          .subscribe(resp => {
            this.datosEstado = resp.estados;
            this.selected = this.data.Estado;
          });
      }
    }
  }

  //#endregion

  //#region CARGA Y SUBIDA DE ARCHIVOS

  //#region MÉTODOS IMAGEN PRINCIPAL

  onFileChangedPrincipal(event: any) {
    this.selectedFilePri = event.target.files[0];
    if (this.selectedFilePri != null) {
      this.txtFilePri = this.selectedFilePri.name;
    }
    if (this.txtFilePri != 'Seleccionar archivo' || this.txtFilePri != 'Actualizar Imagen') {
      this.btnImgPrincipal = true;
    } else {
      this.btnImgPrincipal = false;
    }
  }

  async onUploadPrincipal() {
    this.txtAccionPri = 'Subiendo imagen...';
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
        this.imgsP.push(data.url);
        console.log('IMGS:', this.imgsP);

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

  //#region MÉTODOS IMAGEN HISTORIA

  onFileChangedHistoria(event: any) {
    this.selectedFileHis = event.target.files[0];
    if (this.selectedFileHis != null) {
      this.txtFileHis = this.selectedFileHis.name;
    }
    if (this.txtFilePri != 'Seleccionar archivo' || this.txtFilePri != 'Actualizar Imagen') {
      this.btnImgHistoria = true;
    } else {
      this.btnImgHistoria = false;
    }
  }

  async onUploadHistoria() {
    this.txtAccionHis = 'Subiendo imagen...';
    this.tempImg = false;
    this.tempImgCreate = false;
    const urlImg = `${this.img_url}/upload/perfil/usuarios/`;
    const formData = new FormData();
    formData.append('imagen', this.selectedFileHis);
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
        this.txtAccionHis = 'Ok';
        this.imgsH.push(data.url);
        console.log('IMGS:', this.imgsH);

        this.tempImgCreate = true;
        this.tempImg = false;
        this.imgPrincipal = data.url;
        return data.url;
      } else {
        this.txtAccionHis = 'Ok'
        this.data.ImgHistoria.push(data.url);
        //this.imgs.push(data);
        console.log('IMGS:', this.data.ImgHistoria);
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

  //#region MÉTODOS IMAGEN TRADICIONES

  onFileChangedTradiciones(event: any) {
    this.selectedFileTra = event.target.files[0];
    if (this.selectedFileTra != null) {
      this.txtFileTra = this.selectedFileTra.name;
    }
    if (this.txtFilePri != 'Seleccionar archivo' || this.txtFilePri != 'Actualizar Imagen') {
      this.btnImgTradicion = true;
    } else {
      this.btnImgTradicion = false;
    }
  }

  async onUploadTradiciones() {
    this.txtAccionTra = 'Subiendo imagen...';
    this.tempImg = false;
    this.tempImgCreate = false;
    const urlImg = `${this.img_url}/upload/perfil/usuarios/`;
    const formData = new FormData();
    formData.append('imagen', this.selectedFileTra);
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
        this.txtAccionTra = 'Ok';
        this.imgsT.push(data.url);
        console.log('IMGS:', this.imgsT);

        this.tempImgCreate = true;
        this.tempImg = false;
        this.imgPrincipal = data.url;
        return data.url;
      } else {
        this.txtAccionTra = 'Ok'
        this.data.ImgTradiciones.push(data.url);
        //this.imgs.push(data);
        console.log('IMGS:', this.data.ImgTradiciones);
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

  //#region MÉTODOS IMAGEN CULTURA


  onFileChangedCultura(event: any) {
    this.selectedFileCul = event.target.files[0];
    if (this.selectedFileCul != null) {
      this.txtFileCul = this.selectedFileCul.name;
    }
    if (this.txtFilePri != 'Seleccionar archivo' || this.txtFilePri != 'Actualizar Imagen') {
      this.btnImgCultura = true;
    } else {
      this.btnImgCultura = false;
    }
  }

  async onUploadCultura() {
    this.txtAccionCul = 'Subiendo imagen...';
    this.tempImg = false;
    this.tempImgCreate = false;
    const urlImg = `${this.img_url}/upload/perfil/usuarios/`;
    const formData = new FormData();
    formData.append('imagen', this.selectedFileCul);
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
        this.txtAccionCul = 'Ok';
        this.imgsC.push(data.url);
        console.log('IMGS:', this.imgsC);

        this.tempImgCreate = true;
        this.tempImg = false;
        this.imgPrincipal = data.url;
        return data.url;
      } else {
        this.txtAccionCul = 'Ok'
        this.data.ImgCultura.push(data.url);
        //this.imgs.push(data);
        console.log('IMGS:', this.data.ImgCultura);
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

  //#endregion

  //#region MODAL MAPA

  openDialogAsignarUbicacion(_id?: string) {
    if (_id == null) {
      _id = this.data._id
      this.municipiosServices.cargarMunicipioById(_id).subscribe(resp => {
        //console.log(resp);
      })
    }
    const dialogRef = this.dialog.open(DialogMapaComponent, {
      height: '1000px',
      width: '1000px',
      data: {
        _id: _id,
      }
    });
  }

  //#endregion

  //#region MÉTODOS CREAR Y ACTUALIZAR

  create() {
    this.nombreMun = this.nombreMunicipio;
    //this.imgPrincipal = this.munI;
    this.his = this.historia;
    //this.imgHistoria = this.munIH;
    this.videoHis = this.videoHistoria;
    this.trad = this.tradiciones;
    //this.imgTradiciones = this.munIT;
    this.videoTrad = this.videoTradiciones
    this.cult = this.cultura;
    //this.imgCultura = this.munIC;
    this.videoCult = this.videoCultura;
    this.cli = this.clima;
    this.ubic = this.ubicacion;

    console.log(this.selected)


    if (this.nombreMun === undefined || this.nombreMun === '' || this.nombreMun === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El nombre del Municipio no debe estar vacío!',
      })
      return;
    }

    if (Object.entries(this.imgsP).length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La imagen prirncipal no debe estar vacía!',
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

    if (Object.entries(this.selected).length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El Estado no debe estar vacío!',
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
      this.municipiosServices.crearMunicipio(this.nombreMun, this.imgsP, this.his, this.imgsH, this.videoHis, this.trad,
        this.imgsT, this.videoTrad, this.cult, this.imgsC, this.videoCult, this.cli, this.ubic, this.selectedSTA, this.selected).subscribe(resp => {
          setTimeout(function () {
            window.location.reload()
          }, 1100)
        });
    }
  }



  save() {
    this.muniId = this.data._id;

    this.nombreMun = this.data.NombreMunicipio;
    this.munI = this.data.ImgPrincipal;
    this.his = this.data.Historia;
    this.munIH = this.data.ImgHistoria;
    this.videoHis = this.data.VideoHistoria;
    this.trad = this.data.Tradiciones;
    this.munIT = this.data.ImgTradiciones;
    this.videoTrad = this.data.VideoTradiciones
    this.cult = this.data.Cultura;
    this.munIC = this.data.ImgCultura;
    this.videoCult = this.data.VideoCultura;
    this.cli = this.data.Clima;
    this.ubic = this.data.Ubicacion;

    console.log(this.nombreMun, 'munici: ', this.selected)



    if (this.nombreMun === undefined || this.nombreMun === '' || this.nombreMun === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El nombre del Municipio no debe estar vacío!',
      })
      return;
    }

    if (Object.entries(this.imgPrincipal).length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La imagen prirncipal no debe estar vacía!',
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

    if (Object.entries(this.selected).length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El Estado no debe estar vacío!',
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
            this.municipiosServices.actualizarMunicipio(this.nombreMun, this.munI, this.his, this.munIH, this.videoHis, this.trad,
              this.munIT, this.videoTrad, this.cult, this.munIC, this.videoCult, this.cli, this.ubic, this.selectedSTA, this.muniId, this.selected).subscribe(resp => {
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


  eliminarImagenP() {

    this.idImgsSelectP = this.opcionImgsElimP;
    console.log(this.idImgsSelectP);

    const inde = this.datosImgsP.indexOf(this.idImgsSelectP)
    this.datosImgsP.splice(inde, 1);
    this.pruebaP.splice(inde, 1);
    console.log(this.datosImgsP);
  }

  eliminarImagenH() {

    this.idImgsSelectH = this.opcionImgsElimH;
    console.log(this.idImgsSelectH);

    const inde = this.datosImgsH.indexOf(this.idImgsSelectH)
    this.datosImgsH.splice(inde, 1);
    this.pruebaH.splice(inde, 1);
    console.log(this.datosImgsH);
  }


  eliminarImagenT() {

    this.idImgsSelectT = this.opcionImgsElimT;
    console.log(this.idImgsSelectT);

    const inde = this.datosImgsT.indexOf(this.idImgsSelectT)
    this.datosImgsT.splice(inde, 1);
    this.pruebaT.splice(inde, 1);
    console.log(this.datosImgsT);
  }

  eliminarImagenC() {

    this.idImgsSelectC = this.opcionImgsElimC;
    console.log(this.idImgsSelectC);

    const inde = this.datosImgsC.indexOf(this.idImgsSelectC)
    this.datosImgsC.splice(inde, 1);
    this.pruebaC.splice(inde, 1);
    console.log(this.datosImgsC);
  }

  //#endregion

}
