import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Ferias from '../shared/interfaces/ferias';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeriasService {

  private readonly UriApi = "http://localhost:5276";

  constructor(private http: HttpClient) { }

  buscarFerias(): Observable<Ferias[]> {
    return this.http.get<Ferias[]>(`${this.UriApi}/ferias`);
  }

  buscarFeriasPorId(id: number): Observable<Ferias> {
    return this.http.get<Ferias>(`${this.UriApi}/ferias/${id}`);
  }

  adicionarFerias(ferias: Ferias): Observable<boolean> {
    return this.http.post<boolean>(`${this.UriApi}/ferias`, ferias);
  }

  AtualizarFerias(id: number, ferias: Ferias): Observable<boolean> {
    return this.http.put<boolean>(`${this.UriApi}/ferias/${id}`, ferias);
  }

  deletarFerias(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.UriApi}/ferias/${id}`);
  }
}
