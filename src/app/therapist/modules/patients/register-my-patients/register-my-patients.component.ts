import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientsService } from 'src/app/therapist/services/patients.service';
import { DashboardComponent } from '../../home/dashboard/dashboard.component';
import { ApiResponseRegisterPatientI, RegisterPatientI } from 'src/app/therapist/interfaces/patients.interface';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register-my-patients',
  templateUrl: './register-my-patients.component.html',
  styleUrls: ['./register-my-patients.component.css', './../../videos/upload-video-form/upload-video-form.component.css']
})
export class RegisterMyPatientsComponent {
  /*Variables*/
  patientForm!: FormGroup;
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
    this.createPatientForm();
  }

  /*Método que crea el formulario*/
  createPatientForm() {
    this.patientForm = this.formBuilder.group({
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
      docNumber: ['',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ]
      ],
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

  /*Método que manda a registrar los datos del paciente a la base de datos*/
  registerMyPatient(){
    this.spinnerStatus = false;
    this.patientsService.registerMyPatient(this.headers.getHeaders(), this.patientForm.value)
    .subscribe({
      next: (data: ApiResponseRegisterPatientI) => {
        this.showToastSuccess(data.message, 'Éxito');
        this.spinnerStatus = true;
        this.router.navigateByUrl('/therapist/home/dashboard/patients/my-patients');
      },
      error: () => {
        this.spinnerStatus = true;
        this.showToastError("Error", "No se pudo registrar el paciente");
      }
    })
  }

  /*Método que muestra un toast con mensaje de ÉXITO*/
  showToastSuccess(message: string, title: string){
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
  iconAddPatient = iconos.faUserPlus;
}
