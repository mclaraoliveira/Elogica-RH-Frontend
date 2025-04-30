import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Funcionario } from '../shared/interfaces/funcionario';

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  private apiUrl = 'http://localhost:7050/funcionarios';
  private setoresUrl = 'https://localhost:7050/setores';
  private cargosUrl = 'https://localhost:7050/cargos';
  private horariosUrl = 'https://localhost:7050/horarios';

  funcionarioSelecionado: Funcionario | null = null;

  constructor(private http: HttpClient) {}

  getFuncionarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  listaFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<{ success: boolean, data: Funcionario[] }>(this.apiUrl)
      .pipe(
        map(response => response.data) // Extrai apenas o array `data`
      );
  }

  buscarPorId(id: number): Observable<{ data: Funcionario }> {
    return this.http.get<{ data: Funcionario }>(`${this.apiUrl}/${id}`);
  }

  atualizar(id: number, funcionario: Funcionario): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, funcionario);
  }

  getFuncionariosPaginados(
    pagina: number,
    quantidade: number
  ): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${pagina}/${quantidade}`);
  }

  getSetores(): Observable<any[]> {
    return this.http.get<any[]>(this.setoresUrl);
  }

  getCargos(): Observable<any[]> {
    return this.http.get<any>(this.cargosUrl);
  }

  desativarFuncionario(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/desativa/${id}`, { ativo: false });
  }

  getHorarios(): Observable<any[]> {
    return this.http.get<any[]>(this.horariosUrl);
  }

  cadastrarFuncionario(funcionario: Funcionario): Observable<any> {
    return this.http.post<any>(this.apiUrl, funcionario);
  }
}

