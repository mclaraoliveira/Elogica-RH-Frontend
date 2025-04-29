import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { Menu } from '../interfaces/menu-lateral';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class MenuLateralService {

  private readonly API = 'https://localhost:7050/menus';

  constructor(private http: HttpClient) { }

  listar(): Observable<Menu[]> {
    return this.http.get<ApiResponse<Menu[]>>(this.API).pipe(
      map(response => {
        if (response && Array.isArray(response.data)) {
          return response.data;
        }
        return [];
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Erro ao acessar a API de menus', error);
    return throwError(() => new Error('Erro ao buscar menus.'));
  }
}
