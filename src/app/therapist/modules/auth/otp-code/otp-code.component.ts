import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-otp-code',
  templateUrl: './otp-code.component.html',
  styleUrls: ['./otp-code.component.css', '../no-account/no-account.component.css']
})
export class OtpCodeComponent {
  constructor(
    public modal: NgbModal
  ){}

  /*Método que valida el código OTP y cambia la contraseña*/
  confirmOtpCode(){
    //Consumir servicio y redirigir al dashboard
    this.modal.dismissAll()
  }

  /*Iconos*/
  iconConfirm = iconos.faCircleCheck;
}
