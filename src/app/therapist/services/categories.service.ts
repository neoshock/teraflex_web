import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment'
import { ApiResponseCategoriesI } from '../interfaces/categories.interface';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    /*Variables*/
    urlApi = environment.urlApi;
    options = {}

    /*Constructor*/
    constructor(
        private http: HttpClient,
        private authService: AuthService,
    ) { }

    /*Método que obtiene el listado de todas las categorias disponibles*/
    getAllCategories(headers: Map<string, any>): Observable<ApiResponseCategoriesI> {
        this.options = this.authService.getHeaders(headers);
        return this.http.get<ApiResponseCategoriesI>(this.urlApi + `/categories`, this.options);
    }
}