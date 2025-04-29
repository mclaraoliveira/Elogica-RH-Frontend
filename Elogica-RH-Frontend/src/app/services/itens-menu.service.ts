import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemMenu } from '../shared/interfaces/itemMenu';

@Injectable({
  providedIn: 'root'
})
export class ItensMenuService {
  private readonly API = 'https://localhost:7050/menus';

  constructor(private http: HttpClient) { }

  obterMenus(): Observable<any> {
    return this.http.get<any>(this.API);
  }

  obterMenusPaginado(pagina: number, quantidade: number): Observable<any> {
    const url = `${this.API}/${pagina}/${quantidade}`;
    return this.http.get<any>(url);
  }

  obterMenuPorId(id: number): Observable<ItemMenu> {
    const url = `${this.API}/${id}`;
    return this.http.get<ItemMenu>(url);
  }

  adicionarMenu(menu: ItemMenu): Observable<boolean> {
    return this.http.post<boolean>(this.API, menu);
  }

  atualizarMenu(menu: ItemMenu): Observable<boolean> {
    const url = `${this.API}/${menu.id}`;
    return this.http.put<boolean>(url, menu);
  }

  excluirMenu(id: number | undefined): Observable<boolean>{
    const url = `${this.API}/${id}`;
    return this.http.delete<boolean>(url);
  }

}
