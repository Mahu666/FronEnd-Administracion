import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { environment } from 'src/environments/environment';
import { SitiosService } from '../../services/sitios.service';

import { Categoria } from 'src/app/models/categoria.model';
import { CategoriasService } from '../../services/categorias.service';

import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

import { Municipio } from 'src/app/models/municipio.model';
import { MunicipiosService } from '../../services/municipios.service';

import { UsuariosService } from 'src/app/admin/services/usuarios.service';

import { Estado } from 'src/app/models/estado.model';
import { EstadosService } from 'src/app/apapachador/services/estados.service'
import { APServiciosComponent } from './servicios/servicios.component';
import { ADialogMapaComponent } from './dialog-mapa/dialog-mapa.component';
import { ADialogHorariosComponent } from './dialog-horarios/dialog-horarios.component';

import { ICreateOrderRequest, ICreateSubscriptionRequest } from "ngx-paypal";
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Sitio } from 'src/app/models/sitio.model';

@Component({
  selector: 'app-dialog-sitio',
  templateUrl: './dialog-sitio.component.html',
  styleUrls: ['./dialog-sitio.component.css']
})

export class ADialogSitioComponent implements OnInit {

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

  public btnPay: boolean = false;
  public sitioId: any;
  public btnAddServices: boolean = false;

  public nombreSitio: any;
  public sitImg: any;
  public video: any;
  public descripcion: any;
  public banner: any;

  public nombreContacto1: any;
  public telContacto1: any;
  public correoContacto1: any;

  public nombreContacto2: any;
  public telContacto2: any;
  public correoContacto2: any;

  public servicios: any;
  public horarioOpen: any;
  public horarioClose: any;
  public ubicacion: any;
  //************************************************* licencia ES TIPO DATE EN MODEL API **************************************************
  public licencia: any;
  public facebook: any;
  public instagram: any;
  public sitioWeb: any;

  public nombreSit: any;
  public sitI: any;
  public vid: any;
  public desc: any;
  public bann: any;

  public nombreCont1: any;
  public telCont1: any;
  public correoCont1: any;

  public nombreCont2: any;
  public telCont2: any;
  public correoCont2: any;

  public serv: any;
  public horOpen: any;
  public horClose: any;
  public ubi: any;
  //************************************************* licencia ES TIPO DATE EN MODEL API **************************************************
  public lice: any;


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
  public btnAddUbicacion: boolean = false;
  public btnAddHorario: boolean = false;

  public txtAccionPri: any;
  public txtFilePri: any;
  public selectedFilePri!: File;

  public idEstadoSelect: any;
  public datosEstado: Estado[] = [];
  selectedEst: any;
  opcionSeleccionado: Estado[] = [];

  public payPalConfig: any;
  public showPaypalButtons: boolean = true;
  public todayDate: any;
  public licence: any;
  public year: any;
  public month: any;
  public dt: any;
  public tempImg: boolean = true;
  public tempImgCreate: boolean = true;
  public btnUpload: boolean = false;
  public fb: any;
  public ins; any;
  public sWeb: any;

   //#region MUCHAS IMAGENES

   imgs: string[] = [];
   public dto: any = [];
   opcionImgsElim: Sitio[] = [];
   prueba: string[] = [];
   public idImgsSelect: any;
   public datosImgs: string[] = [];
 
   //#endregion

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

  constructor(public dialogRef: MatDialogRef<ADialogSitioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private sitiosServices: SitiosService, private municipiosServices: MunicipiosService,
    private categoriasServices: CategoriasService, private usuariosServices: UsuariosService, private estadosService: EstadosService, public dialog: MatDialog) {
    if (this.data == null) {
      this.tempImg = false;
      this.tempImgCreate = true;
      this.texto = 'Crear Sitio';
      this.btnTexto = 'Guardar';
      this.txtFilePri = 'Seleccionar archivo'
    } else {
      console.log('data: ', this.data);
      this.btnAddServices = true;
      this.prueba = this.data.ImgPrincipal;
      this.btnAddUbicacion = true;
      this.btnAddHorario = true;
      this.btnPay = true;
      this.tempImgCreate = false;
      this.texto = 'Actualizar Sitio';
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
      this.categoriasServices.cargarCategoriasTodas()
        .subscribe(resp => {
          this.datosCategoria = resp.categorias;
        });
    } else {
      if (this.data != null) {
        this.categoriasServices.cargarCategoriasTodas()
          .subscribe(resp => {
            this.datosCategoria = resp.categorias;
            this.selectedCat = this.data.Categoria;
          });
      }
    }

    //#endregion

    //#region SELECT USUARIO

    if (this.data == null) {
      this.usuariosServices.cargarUsuariosTodos()
        .subscribe(resp => {
          this.datosUsuario = resp.usuarios;
        });
    } else {
      if (this.data != null) {
        this.usuariosServices.cargarUsuariosTodos()
          .subscribe(resp => {
            this.datosUsuario = resp.usuarios;
            this.selectedUsu = this.data.Usuario;
          });
      }
    }

    //#endregion

    //#region SELECT ESTADO

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
            this.selectedEst = this.datosEstado;
            //this.selectedPai = this.data.Pais;
          });
      }
    }

    //#endregion

    //#region SELECT MUNICIPIO

    //*******************************************no es cargarMunicipio es cargarMunicipioTodos************************************ */
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

    this.payPalConfig = {
      currency: "MXN",
      clientId: "AU5-Yic-qk8LY5As0NMSKaCTmQIGi_atbl24QwtUtz9uC677tI5vxV3Cogqea5LFBqi-LppSA2_yISQp",
      createOrder: data =>
        <ICreateOrderRequest>{
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "MXN",
                value: "300.00",
                breakdown: {
                  item_total: {
                    currency_code: "MXN",
                    value: "300.00"
                  }
                }
              },
              items: [
                {
                  name: "Suscripción",
                  quantity: "100",
                  category: "DIGITAL_GOODS",
                  unit_amount: {
                    currency_code: "MXN",
                    value: "300.00"
                  }
                }
              ]
            }
          ]
        },

      advanced: {
        commit: "true"
      },
      style: {
        label: "paypal",
        layout: "vertical"
      },

      onApprove: (data, actions) => {
        console.log(
          "onApprove - Transacción aprobada, pero no autorizada",
          data,
          actions
        );
        actions.order.get().then(details => {
          console.log(
            "onApprove - Se puede obtener todos los detalles de la orden dentro de onApprove.",
            details
          );
        });
      },
      onClientAuthorization: data => {
        var date = new Date(data.update_time);
        var dtod = new Date(data.update_time);

        dtod.setMonth(date.getMonth() + 1);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var dt = date.getDate();

        if (dt < 10) {
          dt = 0 + dt;
        }
        if (m < 10) {
          m = 0 + m;
        }

        console.log('INICIO DE SUSCRIPCIÓN: ', y + '-' + m + '-' + dt + ' SE VENCE: ', dtod.toLocaleDateString());


        //#region ACTUALIZAR PAGO

        this.sitioId = this.data._id;

        this.nombreSit = this.data.NombreSitio;
        this.sitImg = this.data.ImgPrincipal;
        this.vid = this.data.Video;
        this.desc = this.data.Descripcion;
        this.bann = this.data.Banner;

        this.nombreCont1 = this.data.NombreContacto1;
        this.telCont1 = this.data.TelContacto1;
        this.correoCont1 = this.data.CorreoContacto1;

        this.nombreCont2 = this.data.NombreContacto2;
        this.telCont2 = this.data.TelContacto2;
        this.correoCont2 = this.data.CorreoContacto2;

        this.serv = this.data.Servicios;
        this.horOpen = this.data.HorarioOpen;
        this.horClose = this.data.HorarioClose;
        this.ubi = this.data.Ubicacion;
        this.lice = dtod.toISOString();
        this.fb = this.data.Facebook;
        this.ins = this.data.Instagram;
        this.sWeb = this.data.SitioWeb;

        this.sitiosServices.actualizarSitio(this.nombreSit, this.sitImg, this.vid, this.desc, this.bann, this.nombreCont1, this.telCont1, this.correoCont1,
          this.nombreCont2, this.telCont2, this.correoCont2, this.serv, this.horOpen, this.horClose, this.ubi, this.lice, this.fb, this.ins, this.sWeb, this.selectedCat,
          this.data.Usuario, this.selectedMun, this.selectedSTA, this.sitioId).subscribe(resp => {
            this.dialogRef.close("Se ha actualizado correctamente");
            window.location.reload();
          });


        //#endregion


        console.log(
          "onClientAuthorization - Aquí probablemente se debería informar al servidor acerca de la transacción Completada",
          data,

          //LA IDEA ES QUE AQUÍ SE OBTENGA LA FECHA DE LA COMPRA Y AUTORIZACIÓN Y SUMARLE UN MES    **********LISTO**********
          //DESPUÉS MANDARLA A SITIO.LICENCIA. Y HACER VALIDACIÓN
          //SI LA FECHA ACTUAL >= QUE SITIO.LICENCIA SE OCULTARÁN LAS COSAS QUE SE TENGAN QUE OCULTAR.
        );
      },
      onCancel: (data, actions) => {
        console.log("OnCancel", data, actions);
      },
      onError: err => {
        console.log("OnError", err);
      },
      onClick: (data, actions) => {
        console.log("onClick", data, actions);
      }
    };

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
    //URL TEMPORAL PARA PRUEBAS.
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

  //#region MÉTODOS BY ID

  obtenerEstado() {

    this.idEstadoSelect = this.opcionSeleccionado;
    console.log(this.idEstadoSelect);
    this.municipiosServices.cargarMunicipioByEstado(this.idEstadoSelect)
      .subscribe(resp => {
        this.datosMunicipio = resp.municipios;
        this.selectedMun = this.datosMunicipio;
      })

  }

  openDialogAsignarServicios(_id?: string) {
    if (_id == null) {
      _id = this.data._id
      this.sitiosServices.cargarSitioById(_id).subscribe(resp => {
        //console.log(resp);
      })
    }
    const dialogRef = this.dialog.open(APServiciosComponent, {
      height: '350px',
      width: '800px',
      data: {
        _id: _id,
      }
    });
  }

  openDialogAsignarUbicacion(_id?: string) {
    if (_id == null) {
      _id = this.data._id
      this.sitiosServices.cargarSitioById(_id).subscribe(resp => {
        //console.log(resp);
      })
    }
    const dialogRef = this.dialog.open(ADialogMapaComponent, {
      height: '1000px',
      width: '1000px',
      data: {
        _id: _id,
      }
    });
  }

  openDialogAsignarHorario(_id?: string) {
    if (_id == null) {
      _id = this.data._id
      this.sitiosServices.cargarSitioById(_id).subscribe(resp => {
        //console.log(resp);
      })
    }
    const dialogRef = this.dialog.open(ADialogHorariosComponent, {
      height: '700px',
      width: '1300px',
      data: {
        _id: _id,
      }
    });
  }



  //#endregion

  //#region MÉTODOS CREAR Y ACTUALIZAR

  create() {

    this.nombreSit = this.nombreSitio;
    //imgPrincipal  sitImg
    this.vid = this.video;
    this.desc = this.descripcion;
    this.bann = this.banner;

    this.nombreCont1 = this.nombreContacto1;
    this.telCont1 = this.telContacto1;
    this.correoCont1 = this.correoContacto1;

    this.nombreCont2 = this.nombreContacto2;
    this.telCont2 = this.telContacto2;
    this.correoCont2 = this.correoContacto2;

    this.serv = this.servicios;
    this.horOpen = this.horarioOpen;
    this.horClose = this.horarioClose;
    this.ubi = this.ubicacion;
    this.lice = this.licencia;

    //console.log();

    this.sitiosServices.crearSitio(this.nombreSit, this.imgs, this.vid, this.desc, this.bann, this.nombreCont1, this.telCont1, this.correoCont1,
      this.nombreCont2, this.telCont2, this.correoCont2, this.serv, this.horOpen, this.horClose, this.ubi, this.lice, this.selectedSTA).subscribe(resp => {
        this.dialogRef.close("Se ha creado correctamente");
        window.location.reload();
      });

  }

  save() {

    this.sitioId = this.data._id;

    this.nombreSit = this.data.NombreSitio;
    this.sitImg = this.data.ImgPrincipal;
    this.vid = this.data.Video;
    this.desc = this.data.Descripcion;
    this.bann = this.data.Banner;

    this.nombreCont1 = this.data.NombreContacto1;
    this.telCont1 = this.data.TelContacto1;
    this.correoCont1 = this.data.CorreoContacto1;

    this.nombreCont2 = this.data.NombreContacto2;
    this.telCont2 = this.data.TelContacto2;
    this.correoCont2 = this.data.CorreoContacto2;

    this.serv = this.data.Servicios;
    this.horOpen = this.data.HorarioOpen;
    this.horClose = this.data.HorarioClose;
    this.ubi = this.data.Ubicacion;
    this.lice = this.data.Licencia;
    this.fb = this.data.Facebook;
    this.ins = this.data.Instagram;
    this.sWeb = this.data.SitioWeb;

    console.log(this.fb);
    this.sitiosServices.actualizarSitio(this.nombreSit, this.sitImg, this.vid, this.desc, this.bann, this.nombreCont1, this.telCont1, this.correoCont1,
      this.nombreCont2, this.telCont2, this.correoCont2, this.serv, this.horOpen, this.horClose, this.ubi, this.lice, this.fb, this.ins, this.sWeb, this.selectedCat,
      this.data.Usuario, this.selectedMun, this.selectedSTA, this.sitioId).subscribe(resp => {
        this.dialogRef.close("Se ha actualizado correctamente");
        window.location.reload();
      });

  }

  //#endregion

  pay() {
    this.showPaypalButtons = true;
  }

  back() {
    this.showPaypalButtons = false;
  }
  
  eliminarImagen() {

    this.idImgsSelect = this.opcionImgsElim;
    console.log(this.idImgsSelect);

    const inde = this.datosImgs.indexOf(this.idImgsSelect)
    this.datosImgs.splice(inde, 1);
    this.prueba.splice(inde, 1);
    console.log(this.datosImgs);
  }

}
