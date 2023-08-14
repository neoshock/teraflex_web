import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
/*Para los íconos*/
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-no-account',
  templateUrl: './no-account.component.html',
  styleUrls: ['./no-account.component.css']
})
export class NoAccountComponent {

  constructor(
    public modal: NgbModal
  ){}

  /*Iconos*/
  iconInformation = iconos.faInfoCircle;
}
