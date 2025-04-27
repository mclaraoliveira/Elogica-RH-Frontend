import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {

private apiUrl = "https://localhost:7050"

  constructor(private http:HttpClient) { }

  getHorarios():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl);
  }

  adicionarHorario(horario: any):Observable<any>{
    return this.http.post<any>(this.apiUrl, horario);
  }
}
