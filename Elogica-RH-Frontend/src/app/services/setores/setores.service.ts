import { RetornoPaginado } from './../../shared/interfaces/retornoPaginado';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface SetorDto {
  nome: string,
  descricao: string
}

export interface Setor {
  id: number,
  nome: string,
  descricao: string
}

@Injectable({
  providedIn: 'root'
})
export class SetoresService {
  private readonly API = "https://localhost:7050/setores"

  constructor(private http: HttpClient) { }

  buscarSetoresPaginado(pagina: number, qtdRegistros: number): Observable<any>{
    return this.http.get<RetornoPaginado<Setor>>(`${this.API}/${pagina}/${qtdRegistros}`);
  }

  buscarSetorPorId(id: number): Observable<any> {
    const URL = `${this.API}/${id}`;
    return this.http.get<Setor>(URL);
  }

  adicionarSetor(setorDto: SetorDto): Observable<any> {
    return this.http.post<SetorDto>(this.API, setorDto);
  }

  atualizarSetor(id: number, setor: SetorDto): Observable<any> {
    const URL = `${this.API}/${id}`
    return this.http.put<Setor>(URL, setor);
  }

  excluirSetor(id: number): Observable<any> {
    const URL = `${this.API}/${id}`;
    return this.http.delete<Setor>(URL);
  }
}
