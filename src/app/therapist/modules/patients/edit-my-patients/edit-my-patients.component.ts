import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientsService } from 'src/app/therapist/services/patients.service';
import { DashboardComponent } from '../../home/dashboard/dashboard.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { ApiResponseEditPatientI, EditMyPatientBodyI, MyPatientDetailI } from 'src/app/therapist/interfaces/patients.interface';

@Component({
  selector: 'app-edit-my-patients',
  templateUrl: './edit-my-patients.component.html',
  styleUrls: ['./edit-my-patients.component.css', './../../videos/upload-video-form/upload-video-form.component.css']
})
export class EditMyPatientsComponent {
  /*Variables*/
  static patientDetail: MyPatientDetailI;
  editPatientForm!: FormGroup;
  spinnerStatus: boolean = false;

  /*constructor*/
  constructor(
    private formBuilder: FormBuilder,
    private patientsService: PatientsService,
    private headers: DashboardComponent,
    private toastr: ToastrService,
    private router: Router
  ) { }

  /*ngOnInit*/
  ngOnInit() {
    this.spinnerStatus = true;
    this.createEditPatientForm();
    this.getPatientDetail();
  }

  /*Método que crea el formulario*/
  createEditPatientForm() {
    this.editPatientForm = this.formBuilder.group({
      lastName: ['',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ\\s]*$')
        ]
      ],
      firstName: ['',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ\\s]*$')
        ]
      ],
      docNumber: [''],
      birthDate: ['',
        [
          Validators.required,
        ]
      ],
      phone: ['',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ]
      ],
      description: ['',
        [
          Validators.required,
        ]
      ],
    })
  }

  /*Método que rellenar los campos del form con la data del paciente para editar*/
  getPatientDetail() {
    this.editPatientForm.get('lastName')?.setValue(EditMyPatientsComponent.patientDetail.lastName);
    this.editPatientForm.get('firstName')?.setValue(EditMyPatientsComponent.patientDetail.firstName);
    this.editPatientForm.get('docNumber')?.setValue(EditMyPatientsComponent.patientDetail.docNumber);
    this.editPatientForm.get('birthDate')?.setValue(EditMyPatientsComponent.patientDetail.birthDate);
    this.editPatientForm.get('phone')?.setValue(EditMyPatientsComponent.patientDetail.phone);
    this.editPatientForm.get('description')?.setValue(EditMyPatientsComponent.patientDetail.description);
  }

  /*Método que arma el body para enviar a editar*/
  getBodyToEditPatient() {
    let body: EditMyPatientBodyI = {
      lastName: this.editPatientForm.get('lastName')?.value,
      firstName: this.editPatientForm.get('firstName')?.value,
      birthDate: this.editPatientForm.get('birthDate')?.value,
      phone: this.editPatientForm.get('phone')?.value,
      description: this.editPatientForm.get('description')?.value,
    }

    return body;
  }

  /*Método que manda a registrar los datos del paciente a la base de datos*/
  editMyPatient() {
    this.spinnerStatus = false;
    this.patientsService.editMyPatient(this.headers.getHeaders(), this.getBodyToEditPatient(), EditMyPatientsComponent.patientDetail.id)
      .subscribe({
        next: (data: ApiResponseEditPatientI) => {
          this.showToastSuccess("Paciente actualizado con éxito", 'Éxito');
          this.spinnerStatus = true;
          this.router.navigateByUrl('/therapist/home/dashboard/patients/my-patients');
        },
        error: () => {
          this.spinnerStatus = true;
          this.showToastError("Error", "No se pudo actualizar los datos del paciente");
        }
      })
  }

  /*Método que muestra un toast con mensaje de ÉXITO*/
  showToastSuccess(message: string, title: string) {
    this.toastr.success(message, title, {
      progressBar: true,
      timeOut: 3000,
    });
  }

  /*Método que muestra un toast con mensaje de ERROR*/
  showToastError(title: string, message: string) {
    this.toastr.error(message, title, {
      progressBar: true,
      timeOut: 3000,
    });
  }

  /*Icons to use*/
  iconEditPatient = iconos.faUserPen;
}
