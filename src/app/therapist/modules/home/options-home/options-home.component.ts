import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ApiResponseGetMyInformationI, InformationTerapistDetailI } from 'src/app/therapist/interfaces/profile.interface';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/therapist/services/profile.service';

@Component({
  selector: 'app-options-home',
  templateUrl: './options-home.component.html',
  styleUrls: ['./options-home.component.css']
})
export class OptionsHomeComponent {
  /*Variables*/
  spinnerStatus = true;
  detailInfoTerapist: InformationTerapistDetailI = {
    id: 0,
    firstName: "",
    lastName: "",
    docNumber: "",
    phone: "",
    description: "",
    birthDate: "",
    createdAt: "",
    updatedAt: "",
    role: "",
    categoryId: 0,
    categoryName: "",
    status: false,
  };

  /*Constructor*/
  constructor(
    private headers: DashboardComponent,
    private myProfileService: ProfileService,
    private toastr: ToastrService
  ) { }

  /*ngOnInit*/
  ngOnInit(){
    this.getMyInformation();
  }


  /*Método que obtiene la información personal de un terapeuta, para mostrar en el perfil*/
  getMyInformation(){
    this.myProfileService.getMyInformation(this.headers.getHeaders())
      .subscribe({
        next: (data: ApiResponseGetMyInformationI) => {
          this.detailInfoTerapist = data.data;
        },
        error: (error) => {
          this.showToastError("Error", "No se pudo obtener su información");
        }
      })
  }

  /*Método que muestra un toast con mensaje de ERROR*/
  showToastError(title: string, message: string) {
    this.toastr.error(message, title, {
      progressBar: true,
      timeOut: 3000,
    });
  }
}
