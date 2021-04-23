import { getLocaleDateFormat } from '@angular/common';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ICreateOrderRequest, ICreateSubscriptionRequest } from "ngx-paypal";
import { defaultThrottleConfig } from 'rxjs/internal/operators/throttle';


@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {

  public payPalConfig: any;
  public showPaypalButtons: boolean = true;
  public todayDate: any;
  public licence: any;
  public year: any;
  public month: any;
  public dt: any;
  
  constructor() { }

  ngOnInit() {
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

        console.log('INICIO DE SUSCRIPCIÓN: ', y+'-' + m + '-'+dt + ' SE VENCE: ', dtod.toLocaleDateString());

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

  pay() {
    this.showPaypalButtons = true;
  }

  back() {
    this.showPaypalButtons = false;
  }

}
