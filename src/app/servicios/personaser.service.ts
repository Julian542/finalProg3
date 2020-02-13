import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { PersonaInterface } from '../modelo/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaserService {

  constructor(private http:HttpClient) { }
  
  url:string = 'http://localhost:9000/api/v1/persona/';
  
  public selectedPerson : PersonaInterface = {id:null};
  
  getAll():Observable<PersonaInterface[]>{
    return this.http.get<PersonaInterface[]>(this.url);
  }

  getOne(id:number):Observable<PersonaInterface>{
    return this.http.get<PersonaInterface>(this.url + id);
  }
  post(persona:PersonaInterface):Observable<PersonaInterface>{
    return this.http.post<PersonaInterface>(this.url, persona);
  }
  
  put(id:number, persona:PersonaInterface):Observable<PersonaInterface>{
    return this.http.put<PersonaInterface>(this.url+id, persona);
  }
  delete(id:number):Observable<any>{
    return this.http.delete(this.url + id);
  }

}
