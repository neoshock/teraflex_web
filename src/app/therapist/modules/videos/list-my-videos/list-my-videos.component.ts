import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';
import { DashboardComponent } from '../../home/dashboard/dashboard.component';
import { ViewMyVideosComponent } from '../modals/view-my-videos/view-my-videos.component';
import { EditMyVideosComponent } from '../edit-my-videos/edit-my-videos.component';
import { ApiResponseEditDesactivateVideoI, ApiResponseMyVideosI, GetAllMyVideosI } from 'src/app/therapist/interfaces/videos.interface';
import { VideosService } from 'src/app/therapist/services/videos.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { SweetAlerts } from 'src/app/therapist/alerts/alerts.component';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list-my-videos',
  templateUrl: './list-my-videos.component.html',
  styleUrls: ['./list-my-videos.component.css', './../../tasks/list-my-tasks/list-my-tasks.component.css']
})
export class ListMyVideosComponent {
  /*Variables*/
  optionFilter: string = environment.TITLE;
  spinnerStatus: boolean = false;
  statusVideo: boolean = false;
  itemsForPage: number = 5;
  initialPage: number = 0;
  finalPage: number = 5;
  arrayVideos: GetAllMyVideosI[] = [];
  videosToSearch: GetAllMyVideosI[] = [];

  /*Constructor*/
  constructor(
    private headers: DashboardComponent,
    private myVideosService: VideosService,
    private toastr: ToastrService,
    public modal: NgbModal,
    private router: Router,
    private sweetAlerts: SweetAlerts
  ) { }

  /*ngOnInit*/
  ngOnInit() {
    this.getAllMyVideos(true);
  }

  /*Método que obtiene el listado de todos los videos que ha subido un terapeuta*/
  getAllMyVideos(status: boolean) {
    this.statusVideo = status;
    this.spinnerStatus = false;
    this.myVideosService.getAllMyVideos(this.headers.getHeaders(), status).subscribe({
      next: (data: ApiResponseMyVideosI) => {
        this.arrayVideos = data.data;
        this.spinnerStatus = true;
      },
      error: () => {
        this.spinnerStatus = true;
        this.showToastError("Error", "No se pudo obtener el listado de videos");
      }
    });
  }

  /*Método que cambia el filtro entre los activos e inactivos (Eliminados)*/
  onFilterChange(event: any) {
    const value = event.target.value;
    if (value === "true")
      this.getAllMyVideos(true);
    else if (value === "false")
      this.getAllMyVideos(false);

  }

  /*Método que cambias las páginas de la tabla*/
  changePage(e: PageEvent) {
    this.itemsForPage = e.pageSize;
    this.initialPage = e.pageIndex * this.itemsForPage;
    this.finalPage = this.initialPage + this.itemsForPage;
    if (this.finalPage > this.arrayVideos.length) {
      this.finalPage = this.arrayVideos.length;
    }
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
    const company = '          TeraFlex\nListado de Mis Videos';
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
      docResult.save(`${this.getCurrentDate()}_mis_videos.pdf`);
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
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Mis-Videos');
    XLSX.writeFile(workbook, `${this.getCurrentDate()}_mis_videos.xlsx`);
  }

  /*Método que obtiene la fecha actual para mostrarla en el archivo PDF*/
  getCurrentDate(): string {
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1;
    const anio = fechaActual.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }

  /*Método que muestra un toast con mensaje de ERROR*/
  showToastError(title: string, message: string) {
    this.toastr.error(message, title, {
      progressBar: true,
      timeOut: 3000,
    });
  }

  /*Método que muestra un toast con mensaje de ÉXITO*/
  showToastSuccess(message: string, title: string) {
    this.toastr.success(message, title, {
      progressBar: true,
      timeOut: 3000,
    });
  }

  /*Método que desactiva un video*/
  desactivateVideo(idVideo: number, videoTitle: string){
    this.sweetAlerts.alertConfirmCancel("Desactivar video", "¿Está seguro de desactivar el video \"" + videoTitle + "\"?")
      .then(respuesta => {
        if (respuesta.value == true) {
          this.myVideosService.desactivateVideo(this.headers.getHeaders(), idVideo)
            .subscribe({
              next: (data: ApiResponseEditDesactivateVideoI) => {
                this.spinnerStatus = false;
                this.showToastSuccess("Video desactivado con éxito", "Tarea eliminada");
                this.getAllMyVideos(true);
                this.spinnerStatus = true;
              },
              error: (error) => {
                this.spinnerStatus = true;
                this.showToastError("Error", "No se pudo desactivar el video");
              }
            })
        }
      });
  }

  /*Método que muestra modal para ver el detalle de una tarea*/
  openModalViewVideoDetail(viewVideoDetail: any, videoDetail: any, videoType: string) {
    this.modal.open(viewVideoDetail, { size: 'lg', centered: true });
    ViewMyVideosComponent.videoDetailRecibed = videoDetail;
    ViewMyVideosComponent.videoType = videoType;
  }

  /*Método que redirige al componente de editar un video*/
  goToEditVideo(editVideoDetail: GetAllMyVideosI) {
    EditMyVideosComponent.editVideoDetail = editVideoDetail;
    this.router.navigateByUrl("/therapist/home/dashboard/videos/edit-video")
  }

  /*Icons to user*/
  iconUploadVideo = iconos.faVideoCamera;
  iconAdd = iconos.faPlusCircle;
  iconPdf = iconos.faFilePdf;
  iconXlsx = iconos.faFileExcel;

  iconViewDetails = iconos.faEye;
  iconEdit = iconos.faEdit;
  iconActivate = iconos.faToggleOn;

  iconPublic = iconos.faEarthAmericas;
  iconPrivate = iconos.faLock;
}
