import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { PersonaInterface } from '../modelo/persona';
import { catchError} from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaserService {

  constructor(private http:HttpClient) { }
  
  url:string = 'http://localhost:9000/api/v1/persona/';
  
  public selectedPerson : PersonaInterface = {id:null};
  
  getAll():Observable<PersonaInterface[]>{
    return this.http.get<PersonaInterface[]>(this.url).pipe(catchError(this.handleError));
  }

  getOne(id:number):Observable<PersonaInterface>{
    return this.http.get<PersonaInterface>(this.url + id).pipe(catchError(this.handleError));
  }
  post(persona:PersonaInterface){
    return this.http.post<PersonaInterface>(this.url, persona).pipe(catchError(this.handleError));
    
  }
  
  put(id:number, persona:PersonaInterface):Observable<PersonaInterface>{
    return this.http.put<PersonaInterface>(this.url+id, persona).pipe(catchError(this.handleError));
  }
  delete(id:number):Observable<any>{
    return this.http.delete(this.url + id).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {  
    console.log(`ERROR: ${error.status}`);
    alert(`ERROR: ${error.status}`);
    return throwError('¡Lo sentimos, algo ha salido mal! Intentalo de nuevo.');
  }
  
}
