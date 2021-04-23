import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EstadosService } from '../../services/estados.service';
import { PaisesService } from '../../services/paises.service';
import { Pais } from '../../../models/paises.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-estado',
  templateUrl: './dialog-estado.component.html',
  styleUrls: ['./dialog-estado.component.css']
})

export class DialogEstadoComponent implements OnInit {

  //#region VARIABLES

  public estadoId: any;

  public texto: any;
  public btnTexto: any;

  public paises: Pais[] = [];
  public nombreE: any;
  public nombreS: any;
  public nombreEst: any;

  public datosPais: Pais[] = [];
  Paises: string[] = [
  ];

  StatusSELE: boolean[] = [
    true, false
  ];

  //#endregion

  //#region VALIDACIÓN INICIAL

  selectedSTA = (this.data == null) ? this.StatusSELE : this.data.Status;
  selected = (this.data == null) ? this.datosPais : this.data.Pais.nombrePais;

  //#endregion

  //#region CONSTRUCTOR

  constructor(public dialogRef: MatDialogRef<DialogEstadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private estadosServices: EstadosService, private paisesService: PaisesService) {
    if (this.data == null) {
      this.texto = 'Crear Estado';
      this.btnTexto = 'Guardar';
    } else {
      this.texto = 'Actualizar Estado';
      this.btnTexto = 'Actualizar';
    }
  }

  //#endregion

  //#region CARGA INICIAL

  ngOnInit(): void {
    if (this.data == null) {
      this.paisesService.cargarTodosPaises()
        .subscribe(resp => {
          this.datosPais = resp.paises;
        });
    } else {
      if (this.data != null) {
        this.paisesService.cargarTodosPaises()
          .subscribe(resp => {
            this.datosPais = resp.paises;
            this.selected = this.data.Pais._id;
          });
      }
    }
  }

  //#endregion

  //#region MÉTODOS CREAR Y ACTUALIZAR

  create() {
    this.nombreEst = this.nombreE;
    if (this.nombreEst === undefined || this.nombreEst === '' || this.nombreEst === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El nombre del Estado no debe estar vacío!',
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
    console.log(this.selected);
    //console.log(this.Paises.length[0]);
    if (Object.entries(this.selected).length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El Paìs no debe estar vacío!',
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
      this.estadosServices.crearEstado(this.nombreEst, this.selectedSTA, this.selected,).subscribe(resp => {
        this.dialogRef.close("Se ha creado correctamente");
        setTimeout(function () {
          window.location.reload()
        }, 1100)
      });
    }

  }


  save() {
    this.estadoId = this.data._id;
    this.nombreE = this.data.NombreEstado;

    if (this.nombreE === undefined || this.nombreE === '' || this.nombreE === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El nombre del Estado no debe estar vacío!',
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

    if (this.selected === this.datosPais) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El Paìs no debe estar vacío!',
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
            this.estadosServices.actualizarEstado(this.estadoId, this.nombreE, this.selectedSTA, this.selected,).subscribe(resp => {
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
