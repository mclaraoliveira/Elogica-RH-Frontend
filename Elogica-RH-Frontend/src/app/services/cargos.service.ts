// src/app/services/cargo.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environments';
import {
  Cargo,
  CargoDto,
  AtualizarCargoDto,
} from '../shared/interfaces/cargo';
import { ModalService } from '../../app/shared/services/modal.service';
import { RetornoPaginado } from '../shared/interfaces/retornoPaginado';

@Injectable({
  providedIn: 'root'
})
export class CargoService {
  private apiUrl = `${environment.apiUrl}/cargos`;

  constructor(
    private http: HttpClient,
    private modalService: ModalService
  ) { }

  // Listar cargos paginados
  listarCargosPaginado(pagina: number, quantidade: number): Observable<RetornoPaginado<Cargo>> {
    const params = new HttpParams()
      .set('pagina', pagina.toString())
      .set('quantidade', quantidade.toString());

    return this.http.get<RetornoPaginado<Cargo>>(this.apiUrl, { params })
      .pipe(catchError(this.handleError.bind(this)));
  }

  // Listar todos os cargos
  listarCargos(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(this.apiUrl)
      .pipe(catchError(this.handleError.bind(this)));
  }

  // Obter cargo por ID
  obterCargoPorId(id: number): Observable<Cargo> {
    return this.http.get<Cargo>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError.bind(this)));
  }

  // Adicionar novo cargo
  adicionarCargo(cargoDto: CargoDto): Observable<number> {
    return this.http.post<number>(this.apiUrl, cargoDto)
      .pipe(catchError(this.handleError.bind(this)));
  }

  // Atualizar cargo existente
  atualizarCargo(id: number, cargoDto: AtualizarCargoDto): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${id}`, cargoDto)
      .pipe(catchError(this.handleError.bind(this)));
  }

  // Excluir cargo
  excluirCargo(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError.bind(this)));
  }

  // Tratamento de erros
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro desconhecido';

    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do lado do servidor
      if (error.status === 0) {
        errorMessage = 'Não foi possível conectar ao servidor';
      } else if (error.status === 400) {
        // Tratar erros de validação
        if (error.error?.errors) {
          const errors = error.error.errors;
          errorMessage = Object.values(errors).join('\n');
        } else if (error.error?.message) {
          errorMessage = error.error.message;
        } else {
          errorMessage = 'Dados inválidos enviados';
        }
      } else if (error.status === 404) {
        errorMessage = 'Recurso não encontrado';
      } else if (error.status >= 500) {
        errorMessage = 'Erro interno do servidor';
      }
    }

    this.modalService.erro('Erro na API', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
