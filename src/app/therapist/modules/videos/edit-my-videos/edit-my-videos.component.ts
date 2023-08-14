import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardComponent } from '../../home/dashboard/dashboard.component';
import { ApiResponseEditDesactivateVideoI, GetAllMyVideosI, editVideoI } from 'src/app/therapist/interfaces/videos.interface';
import { VideosService } from 'src/app/therapist/services/videos.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-my-videos',
  templateUrl: './edit-my-videos.component.html',
  styleUrls: ['./edit-my-videos.component.css', './../../tasks/list-my-tasks/list-my-tasks.component.css']
})
export class EditMyVideosComponent {
  /*Variables*/
  editVideoForm!: FormGroup;
  spinnerStatus: boolean = false;
  optionVisibilitySelected: string = "";
  static editVideoDetail: GetAllMyVideosI = {
    id: 0,
    url: "",
    title: "",
    type: "",
    isPublic: true,
    description: "",
    createdAt: "",
    updatedAt: ""
  }

  /*Constructor*/
  constructor(
    private headers: DashboardComponent,
    private formBuilder: FormBuilder,
    private videosService: VideosService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  /*ngOnInit*/
  ngOnInit() {
    this.spinnerStatus = true;
    this.createUploadTaskForm();
    this.getInfoVideoDetail();
  }

  /*Crea el formulario que edita un video*/
  createUploadTaskForm() {
    this.editVideoForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      type: [''],
      visibility: [''],
      createdAt: [''],
      url: [''],
      description: ['',
        [
          Validators.required,
          Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚñÑ,.: ]*$"),
        ],
      ],
    });
  }

  /*Método que obtiene los datos del componente listar, para mostrarlos en el formulario*/
  getInfoVideoDetail() {
    this.editVideoForm.get('title')?.setValue(EditMyVideosComponent.editVideoDetail.title);
    this.editVideoForm.get('type')?.setValue(EditMyVideosComponent.editVideoDetail.type);
    this.optionVisibilitySelected = EditMyVideosComponent.editVideoDetail.isPublic ? 'public' : 'private';
    this.editVideoForm.get('createdAt')?.setValue(EditMyVideosComponent.editVideoDetail.createdAt);
    this.editVideoForm.get('url')?.setValue(EditMyVideosComponent.editVideoDetail.url);
    this.editVideoForm.get('description')?.setValue(EditMyVideosComponent.editVideoDetail.description);
  }

  /*Método que manda a editar los campos de video*/
  editVideoDetail() {
    this.spinnerStatus = false;
    this.videosService.editVideo(this.headers.getHeaders(), EditMyVideosComponent.editVideoDetail.id, this.getInfoToEditVideo())
      .subscribe({
        next: (data: ApiResponseEditDesactivateVideoI) => {
          this.spinnerStatus = true;
          this.showToastSuccess(data.message, "Éxito");
          this.router.navigateByUrl("/therapist/home/dashboard/videos/list-videos")
        },
        error: (data: ApiResponseEditDesactivateVideoI) => {
          this.spinnerStatus = true;
          this.showToastError("Error", data.message);
        }
      })
  }

  /*Método que obtiene los datos de los inputs editables*/
  getInfoToEditVideo() {
    const isPublicValue = this.editVideoForm.get('visibility')?.value !== 'private';
    const body: editVideoI = {
      isPublic: isPublicValue,
      description: this.editVideoForm.get('description')?.value
    };
    return body;
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
  iconVideo = iconos.faVideoCamera;
}
