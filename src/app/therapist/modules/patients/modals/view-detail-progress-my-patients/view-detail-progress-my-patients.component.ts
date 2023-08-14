import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from '../../../home/dashboard/dashboard.component';
import { ApiResponseTaskDetailExtendAssignToPatientI } from 'src/app/therapist/interfaces/assigments.interface';
import { AssigmentsService } from 'src/app/therapist/services/assignments.service';
import { ToastrService } from 'ngx-toastr';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view-detail-progress-my-patients',
  templateUrl: './view-detail-progress-my-patients.component.html',
  styleUrls: ['./view-detail-progress-my-patients.component.css']
})
export class ViewDetailProgressMyPatientsComponent {
  /*Variables*/
  static taskDetailAssignId: number;
  taskDetailAssign: any = {
    assignmentId: 0,
    taskId: 0,
    title: "--",
    description: "--",
    estimatedTime: 0,
    isCompleted: false,
    createdAt: "--",
    dueDate: "--",
    files: [
      {
        id: 0,
        url: "--",
        title: "--",
        type: "--"
      }
    ]
  };

  /*constructor*/
  constructor(
    public modal: NgbModal,
    private headers: DashboardComponent,
    private assignmentsService: AssigmentsService,
    private toastr: ToastrService,
  ) { }

  /*ngOnInit*/
  ngOnInit() {
    this.getTaskDetailAssign();
  }

  /*Obtiene el detalle de la tarea asignada al paciente*/
  getTaskDetailAssign() {
    this.assignmentsService.getTaskDetailAssignToPatient(this.headers.getHeaders(), ViewDetailProgressMyPatientsComponent.taskDetailAssignId)
      .subscribe({
        next: (data: ApiResponseTaskDetailExtendAssignToPatientI) => {
          this.taskDetailAssign = data.data;
        },
        error: (error) => {
          this.showToastError("No se pudieron obtener el detalle de la tarea", "Error");
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

  /*Icons to use*/
  iconDetailProgress = iconos.faListUl;
  iconArrowRight = iconos.faCaretRight;
}
