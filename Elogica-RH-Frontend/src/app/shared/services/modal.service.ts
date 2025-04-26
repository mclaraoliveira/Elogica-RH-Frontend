import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor() { }

  // Método pra mostrar um modal simples (com botão de ok)
  mostrarModalSimples(titulo: string, mensagem: string, icone?: SweetAlertIcon): Promise<SweetAlertResult> {
    const config: any = {
      title: titulo,
      icon: icone,
      confirmButtonText: 'OK'
    };

    // Verifica se a mensagem tem tags HTML e se tiver, usa a propriedade HTML. Se não, usa text
    if (/<[a-z][\s\S]*>/i.test(mensagem)) {
      config.html = mensagem;
    } else {
      config.text = mensagem;
    }

    return Swal.fire(config);
  }

  // Método pra modal de confirmação
  confirmar(titulo: string, mensagem: string, textoConfirmacao: string = 'Confirmar', textoCancelamento: string = 'Cancelar'): Promise<SweetAlertResult> {
    const config: any = {
      title: titulo,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: textoConfirmacao,
      cancelButtonText: textoCancelamento,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    };

    if (/<[a-z][\s\S]*>/i.test(mensagem)) {
      config.html = mensagem;
    } else {
      config.text = mensagem;
    }

    return Swal.fire(config);
  }

  // Método pra modal de sucesso
  sucesso(titulo: string, mensagem: string): Promise<SweetAlertResult> {
    return this.mostrarModalSimples(titulo, mensagem, 'success');
  }

  // Método pra modal de erro
  erro(titulo: string, mensagem: string): Promise<SweetAlertResult> {
    return this.mostrarModalSimples(titulo, mensagem, 'error');
  }

  // Método pra modal de aviso
  aviso(titulo: string, mensagem: string): Promise<SweetAlertResult> {
    return this.mostrarModalSimples(titulo, mensagem, 'warning');
  }

  // Método pra modal de informação
  informacao(titulo: string, mensagem: string): Promise<SweetAlertResult> {
    return this.mostrarModalSimples(titulo, mensagem, 'info');
  }

  // Método pra modal de carregamento
  carregando(titulo: string, mensagem: string = 'Por favor, aguarde...'): void {
    const config: any = {
      title: titulo,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    };

    if (/<[a-z][\s\S]*>/i.test(mensagem)) {
      config.html = mensagem;
    } else {
      config.text = mensagem;
    }

    Swal.fire(config);
  }

  // Método pra fechar o modal
  fechar(): void {
    Swal.close();
  }
}
