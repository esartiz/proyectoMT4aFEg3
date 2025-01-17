import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  elUsuario = new BehaviorSubject<User>(new User);
  constructor(private http: HttpClient, private router: Router) {
    this.verificarSesionActual();
  }
  /**
  * Permite obtener la información de usuario
  * que tiene la función activa y servirá
  * para acceder a la información del token
  */
  public get usuarioSesionActiva(): User {
    return this.elUsuario.value;
  }
  /**
  * Permite actualizar la información del usuario
  * que acabó de validarse correctamente
  * @param user información del usuario logueado
  */
  setUsuario(user: User) {
    this.elUsuario.next(user);
  }
  /**
  * Permite obtener la información del usuario
  * con datos tales como el identificador y el token
  * @returns
  */
  getUsuario() {
    return this.elUsuario.asObservable();
  }
  /**
  * Realiza la petición al backend con el correo y la contraseña
  * para verificar si existe o no en la plataforma
  * @param infoUsuario JSON con la información de correo y contraseña
  * @returns Respuesta HTTP la cual indica si el usuario tiene permiso de acceso
  */
  login(infoUsuario: User): Observable<User> {
    return this.http.post<User>(`${environment.production}/login`, infoUsuario);
  }
  /**
  * Guarda los datos tales como el identificador
  * y token del usuario en una base de datos
  * interna del navegador llamada local storage
  * @param datosSesion información del usuario
  * @returns un booleano que indica si la información
  * fue almacenada correctamente
  */
  guardarDatosSesion(datosSesion: any) {
    let sesionActual = localStorage.getItem('sesion');
    let data: User = {
      _id: datosSesion.user_id,
      token: datosSesion.token,
    };
    localStorage.setItem('sesion', JSON.stringify(data));
    this.setUsuario(data);
  }
  /**
  * Permite cerrar la sesión del usuario
  * que estaba previamente logueado
  */
  logout() {
    localStorage.removeItem('sesion');
    this.setUsuario(new User());
  }
  /**
  * Permite verificar si actualmente en el local storage
  * existe información de un usuario previamente logueado
  */
  verificarSesionActual() {
    let sesionActual = this.getDatosSesion();
    if (sesionActual) {
      this.setUsuario(JSON.parse(sesionActual));
    }
  }
  /**
  * Verifica si hay una sesion activa
  * @returns
  */
  sesionExiste(): boolean {
    let sesionActual = this.getDatosSesion();
    return (sesionActual) ? true : false;
  }
  /**
  * Permite obtener los dato de la sesión activa en el
  * local storage
  * @returns
  */
  getDatosSesion() {
    let sesionActual = localStorage.getItem('sesion');
    return sesionActual;
  }
}
