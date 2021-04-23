import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public usuario!: Usuario;
  public formSubmitted = false;
  public perfilForm!: FormGroup;
  public imagenSubir!: File;
  

  constructor(private usuarioService: UsuarioService, private authService: AuthService, 
    private fb: FormBuilder, private fileUploadService: FileUploadService) { 
    this.usuario = authService.usuario;
    console.log(this.usuario);
    
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [ this.usuario.nombre , Validators.required ], 
      email: [this.usuario.email]
    });
  }
  update(){
    
    
    console.log('enviando');
    this.usuarioService.actualizarPerfil( this.perfilForm.value )
    .subscribe( () => {
      const { nombre } = this.perfilForm.value;
      this.usuario.nombre = nombre;
      console.log('Exito');
    }, (err) => {
      console.log(err);
    });
  }

  cambiarImagen( file: File ) {
    console.log(file);
    this.imagenSubir = file;


    const reader = new FileReader();
    reader.readAsDataURL( file );


  }

  subirImagen(){
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid!)
    .then( img => {
      console.log(img);
      this.usuario.img = img;
      //Enviar el url al backend

      
      //this.perfilForm.addControl(this.usuario.img  [img]);
      this.usuarioService.actualizarPerfil(  this.usuario )
      .subscribe( () => {
        const { nombre } = this.perfilForm.value;
        this.usuario.nombre = nombre;
        console.log('Exito');
      }, (err) => {
        console.log(err);
      });

      console.log('Guardado', 'Imagen de usuario actualizada', 'success');
    }).catch( err => {
      console.log(err);
      console.log('Error', 'No se pudo subir la imagen', 'error');
    })
  }

}
