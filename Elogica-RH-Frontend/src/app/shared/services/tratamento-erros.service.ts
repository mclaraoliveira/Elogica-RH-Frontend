import { Injectable } from '@angular/core';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root'
})
export class TratamentoErrosService {
  constructor(private modalService: ModalService) { }

  // Método pra tratar as mensagens de erro da API
  tratarErroApi(respostaApi: { success: boolean; errors: string[] }, titulo: string = 'Erro'): void {
    if (!respostaApi.success && respostaApi.errors && respostaApi.errors.length > 0) {
      // Converte array de erros em HTML
      const mensagemHtml = this.formatarErrosParaHtml(respostaApi.errors);
      this.modalService.erro(titulo, mensagemHtml);
    }
  }

  // Método pra formatar os erros em formato HTML
  private formatarErrosParaHtml(erros: string[]): string {
    // Se só tiver um erro, retorna como texto simples
    if (erros.length === 1) {
      return erros[0];
    }

    // Se tiver mais de um erro, retorna como lista HTML
    const itensLista = erros.map(erro => `<li>${erro}</li>`).join('');
    return `<ul style="text-align: left; margin: 10px 0; padding-left: 20px;">${itensLista}</ul>`;
  }
}
