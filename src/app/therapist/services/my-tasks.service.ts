import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ApiResponseEditTaskDetailI, ApiResponseGetTaskByIdI, ApiResponseMyTasksI, ApiResponseRegisterTaskDetailI, EditTaskDetailI, RegisterTaskDetailI } from '../interfaces/my-tasks.interface';
import { environment } from '../../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class MyTasksService {
    /*Variables*/
    urlApi = environment.urlApi;
    options = {}

    /*Constructor*/
    constructor(
        private http: HttpClient,
        private authService: AuthService,
    ) { }

    /*Método que obtiene el listado de todas las tareas de un terapeuta*/
    getAllMyTasks(headers: Map<string, any>, status: boolean): Observable<ApiResponseMyTasksI> {
        let queryParams = "?";
        queryParams += `status=${status}`;
        this.options = this.authService.getHeaders(headers);
        return this.http.get<ApiResponseMyTasksI>(this.urlApi + `/logged/tasks/${queryParams}`, this.options);
    }

    /*Método que elimina una tarea*/
    deleteTask(idTask:number, headers: Map<string, any>): Observable<string> {
        this.options = this.authService.getHeaders(headers);
        return this.http.delete<string>(this.urlApi + `/tasks/${idTask}`, this.options);
    }

    /*Método que consume el servicio para registrar una tarea con los videos asignados al paciente*/
    registerTaskDetailWithVideos(headers: Map<string, any>, body: RegisterTaskDetailI): Observable<ApiResponseRegisterTaskDetailI> {
        this.options = this.authService.getHeaders(headers);
        return this.http.post<ApiResponseRegisterTaskDetailI>(this.urlApi + "/tasks", body, this.options);
    }

    /*Método que obtiene el detalle de una tarea, por el ID*/
    getTaskDetailById(headers: Map<string, any>, idTask: number): Observable<ApiResponseGetTaskByIdI> {
        this.options = this.authService.getHeaders(headers);
        return this.http.get<ApiResponseGetTaskByIdI>(this.urlApi + `/tasks/${idTask}`, this.options);
    }

    /*Método que edita el detalle de una tarea, por su ID*/
    editTaskDetail(headers: Map<string, any>, idTask: number, body: EditTaskDetailI): Observable<ApiResponseEditTaskDetailI> {
        this.options = this.authService.getHeaders(headers);
        return this.http.put<ApiResponseEditTaskDetailI>(this.urlApi + `/tasks/${idTask}`, body, this.options);
    }
}