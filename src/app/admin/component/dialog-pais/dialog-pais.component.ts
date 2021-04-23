import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaisesService } from '../../services/paises.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-pais',
  templateUrl: './dialog-pais.component.html',
  styleUrls: ['./dialog-pais.component.css']
})

export class DialogPaisComponent implements OnInit {

  //#region VARIABLES

  public paisId: any;
  public texto: any;
  public btnTexto: any;
  public nombreP: any;
  public status: any;
  public nombreS: any;

  StatusSELE: boolean[] = [
    true, false
  ];

  //#endregion

  //#region VALIDACIÓN INICIAL

  selected = (this.data == null) ? this.StatusSELE : this.data.Status;

  //#endregion

  //#region CONSTRUCTOR

  constructor(public dialogRef: MatDialogRef<DialogPaisComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private paisesServices: PaisesService,) {
    if (this.data == null) {
      this.texto = 'Crear País';
      this.btnTexto = 'Guardar';
    } else {
      this.texto = 'Actualizar País';
      this.btnTexto = 'Actualizar';
    }
  }

  //#endregion

  //#region CARGA INICIAL

  ngOnInit(): void {

  }

  //#endregion

  //#region MÉTODOS CREAR Y ACTUALIZAR
  //duda create
  create() {
    if (this.nombreP === undefined || this.nombreP === '' || this.nombreP === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El nombre del País no debe estar vacío!',
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
      this.paisesServices.crearPais(this.nombreP, this.selected).subscribe(resp => {
        this.dialogRef.close("Se ha creado correctamente");
        setTimeout(function () {
          window.location.reload()
        }, 1100)
      });
    }

  }

  save() {
    this.paisId = this.data._id;
    this.nombreP = this.data.NombrePais;

    console.log(this.nombreP);
    if (this.nombreP === undefined || this.nombreP === '' || this.nombreP === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El nombre del País no debe estar vacío!',
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
            this.paisesServices.actualizarPais(this.paisId, this.nombreP, this.selected,).subscribe(resp => {
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
