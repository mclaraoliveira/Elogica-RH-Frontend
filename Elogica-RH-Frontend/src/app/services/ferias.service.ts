import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import Ferias from '../shared/interfaces/ferias';
import { HttpClient } from '@angular/common/http';

type ResponseApiFerias = {
  success: boolean;
  data: Ferias[];
};

@Injectable({
  providedIn: 'root'
})
export class FeriasService {

  private readonly UriApi = "https://localhost:7050";

  constructor(private http: HttpClient) { }


  buscarFerias(): Observable<Ferias[]> {
    return this.http.get<ResponseApiFerias>(`${this.UriApi}/ferias`)
      .pipe(
        map(response => response.data) // Extrai apenas o array `data`
      );
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
