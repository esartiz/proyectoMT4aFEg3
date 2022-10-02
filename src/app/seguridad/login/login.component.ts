import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  correo:string="";
  contrasena:string="";

  constructor(private miServicioSeguridad:AuthService, private router:Router) { }

  ngOnInit(): void {
    console.log("Correo: " + this.correo + " / Contraseña: " + this.contrasena);
    let elUsuario:User = {
      correo: this.correo,
      contrasena: this.contrasena
    }
    this.miServicioSeguridad.login(elUsuario).subscribe(
      data=>{
        this.router.navigate(['dashboard']);
        this.miServicioSeguridad.guardarDatosSesion(data);
      },
      error=>{
        alert("Error")
      }
    )
  }

}
