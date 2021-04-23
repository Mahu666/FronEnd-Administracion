import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const img_url = environment.img_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async actualizarFoto(
    archivo: File,
    tipo:  'usuarios'|'pais'|'estado'| 'municipio'| 'sitio'| 'producto'| 'taller',
    id: string
  ) {

    try {

      const url = `${ img_url }/upload/${ tipo }/${ id }`;
      const formData = new FormData();
      formData.append('imagen', archivo);

      const resp = await fetch( url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();

      if ( data.ok ) {
        return data.url;
      } else {
        console.log(data.msg);
        return false;
      }
      
    } catch (error) {
      console.log(error);
      return false;    
    }

  }



}
