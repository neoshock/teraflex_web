import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { MatStepper } from '@angular/material/stepper';
import { DashboardComponent } from '../../home/dashboard/dashboard.component';
import { ApiResponseCategoriesI, GetCategoryI } from 'src/app/therapist/interfaces/categories.interface';
import { ApiResponseEditTaskDetailI, EditTaskDetailI, MyTasksI } from 'src/app/therapist/interfaces/my-tasks.interface';
import { GetAllMyVideosI } from 'src/app/therapist/interfaces/videos.interface';
import { CategoriesService } from 'src/app/therapist/services/categories.service';
import { MyTasksService } from 'src/app/therapist/services/my-tasks.service';
import { ToastrService } from 'ngx-toastr';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-my-tasks',
  templateUrl: './edit-my-tasks.component.html',
  styleUrls: ['./edit-my-tasks.component.css', './../create-task/create-task.component.css']
})
export class EditMyTasksComponent {
  /*Variables*/
  @ViewChild('stepper') stepper!: MatStepper;
  static taskDetail: MyTasksI;
  editTaskForm!: FormGroup;
  spinnerStatus: boolean = false;
  itemsForPage: number = 5;
  initialPage: number = 0;
  finalPage: number = 5;
  optionCategorySelected: number = 0;
  optionVisibilitySelected: string = "";
  arrayVideosInfo: GetAllMyVideosI[] = [];
  arrayCategories: GetCategoryI[] = [];
  arrayVideosId: number[] = []; /*Array que contiene los id de los videos*/
  selectedCheckboxes: { [key: number]: boolean } = {}; /*Array que contiene temporalmente el valor de los checks*/

  /*Constructor*/
  constructor(
    private formBuilder: FormBuilder,
    private headers: DashboardComponent,
    private categoriesService: CategoriesService,
    private myTasksService: MyTasksService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  /*ngOnInit*/
  ngOnInit() {
    this.spinnerStatus = true;
    this.createEditTaskForm();
    this.getAllCategories();
    this.getTaskDetail();
  }

  /*Método que obtiene la data de una tarea según el ID y la precarga en los inputs del formulario*/
  getTaskDetail() {
    this.editTaskForm.get('title')?.setValue(EditMyTasksComponent.taskDetail.title);
    this.optionVisibilitySelected = EditMyTasksComponent.taskDetail.isPublic ? 'public' : 'private';
    this.optionCategorySelected = EditMyTasksComponent.taskDetail.categoryIds[0];
    this.editTaskForm.get('category')?.setValue(EditMyTasksComponent.taskDetail.categoryIds[0]);
    this.editTaskForm.get('timeEstimated')?.setValue(EditMyTasksComponent.taskDetail.estimatedTime);
    this.editTaskForm.get('description')?.setValue(EditMyTasksComponent.taskDetail.description);
  }

  /*Método que obtiene el listado de todas las categorias disponibles*/
  getAllCategories() {
    this.categoriesService.getAllCategories(this.headers.getHeaders())
      .subscribe({
        next: (data: ApiResponseCategoriesI) => {
          this.arrayCategories = data.data;
          this.arrayCategories.sort((a, b) => a.name.localeCompare(b.name));
        },
        error: (error) => {
          this.showToastError("Error", "No se pudo cargar el listado de categorías");
        }
      });
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

  /*Crea el formulario que registra una tarea*/
  createEditTaskForm() {
    this.editTaskForm = this.formBuilder.group({
      title: ['',
        [
          Validators.required,
          Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚñÑ,.: ]*$"),
        ],
      ],
      visibility: ['',
        [Validators.required],
      ],
      category: ['',
        [Validators.required],
      ],
      timeEstimated: ['',
        [
          Validators.required,
          Validators.pattern("^[0-9]+$"),
        ],
      ],
      description: ['',
        [Validators.required],
      ],
    });
  }

  /*Método que para avanzar al siguiente paso del stepper*/
  nextStepAssignTasks() {
    this.stepper.next();
  }

  /*Método que obtiene el body para editar*/
  getBodyToEditTask() {
    let body: EditTaskDetailI = {
      title: this.editTaskForm.get('title')?.value,
      description: this.editTaskForm.get('description')?.value,
      status: true,
      estimatedTime: Number(this.editTaskForm.get('timeEstimated')?.value),
      isPublic: this.optionVisibilitySelected == 'public' ? true : false,
      categories: [Number(this.editTaskForm.get('category')?.value)],
    }
    return body;
  }

  /*Método que consume el servicio que manda a editar una tarea*/
  editTaskDetail() {
    this.spinnerStatus = false;
    this.myTasksService.editTaskDetail(this.headers.getHeaders(), EditMyTasksComponent.taskDetail.id, this.getBodyToEditTask())
      .subscribe({
        next: (data: ApiResponseEditTaskDetailI) => {
          this.spinnerStatus = true;
          this.showToastSuccess("Tarea editada con éxito", "Éxito");
          this.router.navigateByUrl('/therapist/home/dashboard/tasks/my-tasks');
        },
        error: (error) => {
          this.spinnerStatus = true;
          this.showToastError("Error", "No se pudo editar la tarea");
        }
      });
  }

  /*Método que cambia las páginas de la tabla*/
  changePage(e: PageEvent) {
    this.itemsForPage = e.pageSize;
    this.initialPage = e.pageIndex * this.itemsForPage;
    this.finalPage = this.initialPage + this.itemsForPage;
    if (this.finalPage > this.arrayVideosInfo.length) {
      this.finalPage = this.arrayVideosInfo.length;
    }
  }

  /*Método que mantiene marcados los inputs check cuando cambio entre página*/
  addOrRemoveVideoId(id: number) {
    this.selectedCheckboxes[id] = !this.selectedCheckboxes[id];
    const index = this.arrayVideosId.indexOf(id);
    if (index === -1)
      this.arrayVideosId.push(id);
    else
      this.arrayVideosId.splice(index, 1);
  }

  /*Icons to use*/
  iconCreateTask = iconos.faFile;
  iconVerDetalles = iconos.faEye;
  iconBack = iconos.faArrowLeft;
}
