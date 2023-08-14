import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Login } from '../interfaces/login.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /*Variables*/
  identification = '';
  password = '';
  urlApi = environment.urlApi;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': '*/*',
    'Access-Control-Request-Header': 'Content-type',
    'Access-Control-Allow-Origin': '*'
  });
  options = {}

  /*Constructor*/
  constructor(
    private http: HttpClient
  ) { }

  /*Método que consume el servicio para login*/
  loginUser(headers: Map<string, any>): Observable<Login> {
    this.getHeaders(headers);
    return this.http.post<Login>(this.urlApi + "/auth/login", null, this.options);
  }

  /*Método que obtiene los Headers*/
  public getHeaders(headers: Map<string, any> | undefined) {
    /* if (headers != null) {
      headers.forEach((value, key) => {
        if(!this.headers.has(key)){
          this.headers = this.headers.append(key, value || '');
        }else {
          this.headers=this.headers.delete(key);
          this.headers=this.headers.append(key,value);
        }
      });
    } */
    if (headers != null) {
      headers.forEach((value, key) => {
        this.headers = this.headers.append(key, value || '');
      });
    }
    this.headers = this.headers.delete('Authorization');
    this.headers = this.headers.append('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
    this.options = { headers: this.headers };
    return this.options;
    /*  return headers != null; */
  }

  public removeHeaders(headers: string[] | undefined) {
    if (headers != null) {
      headers.forEach((value) => {
        if (this.headers.has(value)) {
          this.headers = this.headers.delete(value);
        }
      });
    }
    this.options = { headers: this.headers };
    return this.options;
  }
}