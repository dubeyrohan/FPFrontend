import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(
    private http:HttpClient
  ) { }

  //login API
  public getLoginDetails( queryParamsUrl: string): Observable<any>{
    return this.http.get(`http://localhost:8080/user/`+ queryParamsUrl);
  }
}
