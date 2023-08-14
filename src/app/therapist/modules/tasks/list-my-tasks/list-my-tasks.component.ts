import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { DashboardComponent } from '../../home/dashboard/dashboard.component';
import { EditMyTasksComponent } from '../edit-my-tasks/edit-my-tasks.component';
import { ViewTaskDetailComponent } from '../modals/view-task-detail/view-task-detail.component';
import { ApiResponseMyTasksI, MyTasksI } from 'src/app/therapist/interfaces/my-tasks.interface';
import { MyTasksService } from 'src/app/therapist/services/my-tasks.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlerts } from 'src/app/therapist/alerts/alerts.component';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list-my-tasks',
  templateUrl: './list-my-tasks.component.html',
  styleUrls: ['./list-my-tasks.component.css'],
})
export class ListMyTasksComponent {
  /*Variables*/
  optionFilter: string = environment.TITLE;
  formSelect = new FormGroup({
    filtro: new FormControl('ci', Validators.required),
  })
  spinnerStatus: boolean = false;
  itemsForPage: number = 5;
  initialPage: number = 0;
  finalPage: number = 5;
  arrayTasks: MyTasksI[] = [];
  tasksToSearch: MyTasksI[] = [];
  optionsPage: any;

  /*Constructor*/
  constructor(
    private headers: DashboardComponent,
    private myTasksService: MyTasksService,
    private sweetAlerts: SweetAlerts,
    private toastr: ToastrService,
    private modal: NgbModal,
    private router: Router
  ) { }

  /*ngOnInit*/
  ngOnInit(): void {
    this.getListMyTasks()
  }

  /*Método que redirige al componente de editar con la data cargada*/
  goToEditMyTask(taskDetail: MyTasksI) {
    EditMyTasksComponent.taskDetail = taskDetail;
    this.router.navigateByUrl("/therapist/home/dashboard/tasks/edit-task")
  }

  /*Método que obtiene los headers*/
  getHeaders() {
    let headers = new Map();
    headers.set("token", sessionStorage.getItem("token"));
    headers.set("role", sessionStorage.getItem("role"));
    return headers;
  }

  /*Método que elimina una tarea*/
  deleteTask(idTask: number, nameTask: string) {
    this.sweetAlerts.alertConfirmCancel("Eliminar tarea", "¿Está seguro de eliminar la tarea " + nameTask + "?").then(respuesta => {
      if (respuesta.value == true) {
        this.myTasksService.deleteTask(idTask, this.getHeaders())
          .subscribe({
            next: (data: string) => {
              this.spinnerStatus = false;
              this.getListMyTasks();
              this.showToastSuccess("Tarea eliminada con éxito", "Tarea eliminada");
              this.spinnerStatus = true;
            },
            error: (error) => {
              this.spinnerStatus = true;
              this.showToastError("Error", "No se pudo eliminar la tarea");
            }
          })
      }
    });
  }

  /*Método que obtiene el listado de las tareas que ha creado un terapeuta*/
  getListMyTasks() {
    this.spinnerStatus = false;
    this.myTasksService.getAllMyTasks(this.headers.getHeaders(), true)
      .subscribe({
        next: (data: ApiResponseMyTasksI) => {
          this.arrayTasks = data.data;
          this.spinnerStatus = true;
        },
        error: (error) => {
          this.spinnerStatus = true;
          this.showToastError("Error", "No se pudo obtener el listado de tareas");
        }
      })
  }

  /*Método que cambia las páginas de la tabla*/
  changePage(e: PageEvent) {
    this.itemsForPage = e.pageSize;
    this.initialPage = e.pageIndex * this.itemsForPage;
    this.finalPage = this.initialPage + this.itemsForPage;
    if (this.finalPage > this.arrayTasks.length) {
      this.finalPage = this.arrayTasks.length;
    }
  }

  /*Método que obtiene la fecha actual para mostrarla en el archivo PDF*/
  getCurrentDate(): string {
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1;
    const anio = fechaActual.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }

  /*Método que exporta los datos de la tabla, a formato .PDF*/
  downloadPDF() {
    const image = new Image();
    image.src = 'https://res.cloudinary.com/dfzyxagbc/image/upload/v1689220539/logo-teraflex_avz0fx.png';

    //this.estadoSpinner = false;
    const DATA = document.getElementById('htmlTablePDF') as HTMLElement;
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = { background: 'white', scale: 3 };
    //Datos para el encabezado
    const company = '          TeraFlex\nListado de Mis Tareas';
    const dateEmision = 'Fecha de emisión: ' + this.getCurrentDate();
    html2canvas(DATA, options).then((canvas) => {
      const img = canvas.toDataURL('image/PNG');
      //Agregar image Canvas al PDF
      const bufferX = 15;
      const bufferY = 155;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      // Agregamos el encabezado
      doc.addImage(image, 'JPEG', 265, 20, 50, 50);
      doc.setFontSize(18);
      doc.text(company, 200, 100); // Posicionamos el texto a 15,30 (X,Y)
      doc.setFontSize(11);
      doc.text(dateEmision, 15, 140);
      return doc;
    }).then((docResult) => {
      docResult.save(`${this.getCurrentDate()}_mis_tareas.pdf`);
      //this.estadoSpinner = true;
    });
  }

  /*Método que exporta los datos de la tabla, a formato .XLSX*/
  downloadXLSX() {
    const table = document.getElementById('htmlExcelTable') as HTMLElement;
    const rows: any = [];
    const tableRows = table.querySelectorAll('tr');
    tableRows.forEach((row, rowIndex) => {
      const cells = row.querySelectorAll('td, th');
      const rowData: any = [];
      cells.forEach((cell, cellIndex) => {
        rowData.push((cell as HTMLElement).innerText);
      });
      rows.push(rowData);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Mis-Tareas');
    XLSX.writeFile(workbook, `${this.getCurrentDate()}_mis_tareas.xlsx`);
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

  /*Método que muestra modal para ver el detalle de una tarea*/
  openModalViewTaskDetail(viewTaskDetail: any, taskID: number) {
    this.modal.open(viewTaskDetail, { size: 'lg', centered: true });
    ViewTaskDetailComponent.taskID = taskID;
  }

  //Iconos a utilizar
  iconMyTasks = iconos.faFileLines;
  iconAdd = iconos.faPlusCircle
  iconVerDetalles = iconos.faEye;
  iconEditar = iconos.faEdit;
  iconEliminar = iconos.faTrash;

  iconPublic = iconos.faEarthAmericas;
  iconPrivate = iconos.faLock;

  iconPdf = iconos.faFilePdf;
  iconXlsx = iconos.faFileExcel;
}
