import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/therapist/services/auth.service';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  spinnerStatus = false;

  constructor(
    private ruta: Router,
    private api: AuthService,
    public modal: NgbModal,
    private toastr: ToastrService
  ) { }


  ngOnInit() {
    this.spinnerStatus = true;
  }

  loginForm = new FormGroup({
    identification: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  /*Método que inicia la sesión del usuario*/
  loginUser() {
    this.spinnerStatus = false;
    this.api.loginUser(this.getHeaders()).subscribe(data => {
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("role", data.role)
      if (data.role == environment.THERAPIST) {
        this.spinnerStatus = true;
        this.ruta.navigateByUrl('/therapist/home/dashboard');
        this.showToastSuccess("Inicio de sesión exitoso", "Bienvenido")
      }
      else {
        this.spinnerStatus = true;
        this.showToastSuccess("Inicio de sesión exitoso", "Administrador")
      }
    }, error => {
      this.spinnerStatus = true;
      this.showToastError("Error", "No se pudo inciar sesión")
    })
  }

  /*Obtiene y retorna los headers*/
  getHeaders(){
    let headers = new Map();
    headers.set("identification", this.loginForm.value.identification);
    headers.set("password", this.loginForm.value.password);
    return headers;
  }

  /*Método que muestra un toast con mensaje de ÉXITO*/
  showToastSuccess(message: string, title: string){
    this.toastr.success(message, title, {
      progressBar: true,
      timeOut: 3000,
    });
  }

  /*Método que muestra un toast con mensaje de ERROR*/
  showToastError(title: string, message: string){
    this.toastr.error(message, title, {
      progressBar: true,
      timeOut: 3000,
    });
  }

  /*Método que redirige al módulo de recuperar la contraseña*/
  goToForgotPassword() {
    this.ruta.navigateByUrl('/auth/forgot-password');
  }

  /*Método que muestra modal para los usuarios que no tienen una cuenta*/
  openModalNoAccount(noAccount: any) {
    this.modal.open(noAccount, { size: 'lg', centered: true });
  }

  /*Iconos*/
  iconForgotPassword = iconos.faLock
}
