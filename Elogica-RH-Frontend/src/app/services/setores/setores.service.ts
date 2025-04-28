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

  buscarSetoresPaginado(pagina: number, qtdRegistros: number): Observable<RetornoPaginado<Setor>>{
    return this.http.get<RetornoPaginado<Setor>>(this.API)
  }

  buscarSetorPorId(id: number): Observable<Setor> {
    const URL = `${this.API}/${id}`;
    return this.http.get<Setor>(URL);
  }

  adicionarSetor(setorDto: SetorDto): Observable<SetorDto> {
    return this.http.post<SetorDto>(this.API, setorDto);
  }

  atualizarSetor(setor: Setor): Observable<Setor> {
    const URL = `${this.API}/${setor.id}`
    return this.http.put<Setor>(URL, setor);
  }

  excluirSetor(id: number): Observable<Setor> {
    const URL = `${this.API}/${id}`;
    return this.http.delete<Setor>(URL);
  }
}
