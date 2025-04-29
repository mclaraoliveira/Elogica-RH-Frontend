import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cargo } from '../shared/interfaces/cargo';
import { RetornoPaginado } from '../shared/interfaces/retornoPaginado';

@Injectable({
  providedIn: 'root'
})
export class CargosService {
  private readonly API = 'https://localhost:7050/cargos';

  constructor(private http: HttpClient) { }

  buscarCargosPaginado(pagina: number, quantidade: number): Observable<RetornoPaginado<Cargo>> {
    return this.http.get<RetornoPaginado<Cargo>>(`${this.API}/${pagina}/${quantidade}`);
  }

  adicionarCargo(cargo: Cargo): Observable<number> {
    return this.http.post<number>(this.API, cargo);
  }

  atualizarCargo(id: number, cargo: Cargo): Observable<Cargo> {
    return this.http.put<Cargo>(`${this.API}/${id}`, cargo);
  }

  excluirCargo(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.API}/${id}`);
  }
  vincularSetores(idCargo: number, setoresIds: number[]): Observable<Cargo> {
    return this.http.put<Cargo>(`${this.API}/${idCargo}/setores`, { setoresIds });
  }
}
