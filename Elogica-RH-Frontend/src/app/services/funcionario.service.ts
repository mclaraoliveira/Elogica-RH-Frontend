import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  private apiUrl = 'https://localhost:7050/funcionarios';

  // URL para os endpoints de setores, cargos e horários
  private setoresUrl = 'https://localhost:7050/setores'; // Altere conforme sua API
  private cargosUrl = 'https://localhost:7050/cargos'; // Altere conforme sua API
  private horariosUrl = 'https://localhost:7050/horarios'; // Altere conforme sua API

  constructor(private http: HttpClient) {}

  getFuncionarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getFuncionariosPaginados(
    pagina: number,
    quantidade: number
  ): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${pagina}/${quantidade}`);
  }

  // Método para obter setores
  getSetores(): Observable<any[]> {
    return this.http.get<any[]>(this.setoresUrl);
  }

  // Método para obter cargos
  getCargos(): Observable<any[]> {
    return this.http.get<any[]>(this.cargosUrl);
  }

  // Método para obter horários
  getHorarios(): Observable<any[]> {
    return this.http.get<any[]>(this.horariosUrl);
  }

  // Método para cadastrar um novo funcionário
  cadastrarFuncionario(funcionario: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, funcionario);
  }
}
