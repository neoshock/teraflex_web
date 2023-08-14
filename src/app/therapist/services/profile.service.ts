import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment'
import { ApiResponseGetMyInformationI } from '../interfaces/profile.interface';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    /*Variables*/
    urlApi = environment.urlApi;
    options = {}

    /*Constructor*/
    constructor(
        private http: HttpClient,
        private authService: AuthService,
    ) { }

    /*Método que obtiene la información personal de un terapeuta (Datos del perfil)*/
    getMyInformation(headers: Map<string, any>): Observable<ApiResponseGetMyInformationI> {
        this.options = this.authService.getHeaders(headers);
        return this.http.get<ApiResponseGetMyInformationI>(this.urlApi + `/user/my-profile`, this.options);
    }
}