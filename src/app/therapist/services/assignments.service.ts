import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, catchError, map } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment'
import { ApiResponseGetMyPatientsI } from '../interfaces/patients.interface';
import { ApiResponseGetMyPatientByIdI } from '../interfaces/patients.interface';
import { ApiResponseAssignTasksToPatientI, ApiResponseListTasksAssignsToPatientI, ApiResponseTaskDetailExtendAssignToPatientI } from '../interfaces/assigments.interface';

@Injectable({
    providedIn: 'root'
})
export class AssigmentsService {
    /*Variables*/
    urlApi = environment.urlApi;
    options = {}

    /*Constructor*/
    constructor(
        private http: HttpClient,
        private authService: AuthService,
    ) { }

    /*Método que obtiene el listado de los pacientes que tiene un terapeuta*/
    registerTasksAssignToPatient(headers: Map<string, any>, patientId: number, body: any): Observable<ApiResponseAssignTasksToPatientI> {
        this.options = this.authService.getHeaders(headers);
        return this.http.post<ApiResponseAssignTasksToPatientI>(this.urlApi + `/patients/${patientId}/tasks`, body, this.options);
    }

    /*Método que obtiene la lista de tareas asignadas a un paciente, mediante su ID*/
    getListTasksAssingToPatient(headers: Map<string, any>, patientId: number): Observable<ApiResponseListTasksAssignsToPatientI> {
        this.options = this.authService.getHeaders(headers);
        return this.http.get<ApiResponseListTasksAssignsToPatientI>(this.urlApi + `/patients/${patientId}/tasks`, this.options);
    }

    /*Método que obtiene el detalle de una tarea asignada a un paciente, mediante su ID*/
    getTaskDetailAssignToPatient(headers: Map<string, any>, assignmentId: number): Observable<ApiResponseTaskDetailExtendAssignToPatientI> {
        this.options = this.authService.getHeaders(headers);
        return this.http.get<ApiResponseTaskDetailExtendAssignToPatientI>(this.urlApi + `/assignments/${assignmentId}/task`, this.options);
    }

    /*Método que elimina una tarea asignada a un paciente*/
    deleteTaskAssignToPatient(headers: Map<string, any>, body: number[]): Observable<string> {
        this.options = this.authService.getHeaders(headers);
        return this.http.delete(this.urlApi + `/assignments`, { ...this.options, body: body, responseType: 'text' })
    }
}