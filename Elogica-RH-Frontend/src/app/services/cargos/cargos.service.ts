import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Cargo} from '../../shared/interfaces/cargo';
import { RetornoPaginado } from '../../shared/interfaces/retornoPaginado';
import { SetoresService } from '../setores/setores.service';

@Injectable({
  providedIn: 'root'
})
export class CargosService {


  private readonly API = 'https://localhost:7050/cargos';

  constructor(private http: HttpClient, private setorService: SetoresService) { }

  buscarCargoPorId(id: number): Observable<Cargo> {
    return this.http.get<Cargo>(`${this.API}/${id}`);
  };

  buscarCargosPaginado(pagina: number, quantidade: number): Observable<RetornoPaginado<Cargo>> {
    return this.http.get<any>(`${this.API}/${pagina}/${quantidade}`)
      .pipe(map(resposta => resposta.data));
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
//
