import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Horario } from '../shared/interfaces/horario';
import { ModalService } from '../shared/services/modal.service';
import { RetornoPaginado } from '../shared/interfaces/retornoPaginado';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {

private apiUrl = "https://localhost:7050/horarios"

  constructor(private http:HttpClient) { }

  buscarHorarios():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl);
  }

  adicionarHorario(horario: any):Observable<any>{
    return this.http.post<any>(this.apiUrl, horario);
  }
  atualizarHorario(Id: number, horario: Horario): Observable<Horario>{
    return this.http.put<Horario>(`${this.apiUrl}/${Id}`, horario);
  }

  excluirHorario(id: number): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
  }

  
}
