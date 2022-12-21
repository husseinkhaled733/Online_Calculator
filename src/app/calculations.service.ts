import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const Url='http://localhost:8080/solve';


@Injectable({
  providedIn: 'root'
})
export class CalculationsService {
  
  
  constructor(private http:HttpClient) { }



  evaluate(data: string): Observable<string> {
    return this.http.post<string>(Url, data);
  }
}
