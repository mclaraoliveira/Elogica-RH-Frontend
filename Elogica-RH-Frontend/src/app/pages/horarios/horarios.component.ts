import { Component } from '@angular/core';
import { HorariosService } from '../../services/horarios.service';
import { CommonModule } from '@angular/common';
import { Horario } from '../../shared/interfaces/horario';
import Swal from 'sweetalert2';
import { ModalService } from '../../shared/services/modal.service';

@Component({
  selector: 'app-horarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './horarios.component.html',
  styleUrl: './horarios.component.css'
})
export class HorariosComponent {

  horarios: any[] = [];

  constructor(private horariosService: HorariosService,
    private modalService:ModalService
  ) { }

  ngOnInit(): void {
    this.carregarHorarios();
  }


//#region Validar Horario

ValidarHorario(horario:Horario): {isValid: boolean; mensagemErro: string}{


  const inicio = new Date(horario.horarioInicio + 'Z');
  const fim = new Date(horario.horarioFim + 'Z');
  const intervaloInicio = new Date(horario.intervaloInicio + 'Z');
  const intervaloFim = new Date(horario.intervaloFim + 'Z');



  if (isNaN(inicio.getTime()) || isNaN(fim.getTime()) || isNaN(intervaloInicio.getTime()) || isNaN(intervaloFim.getTime())) {
    return { isValid: false, mensagemErro: 'Um ou mais horários são inválidos.' };
  }

  const jornadaTotalMinutos = (fim.getTime() - inicio.getTime()) / (1000 * 60);

  const intervaloMinutos = (intervaloFim.getTime() - intervaloInicio.getTime()) / (1000 * 60);

  const tempoTrabalhoMinutos = jornadaTotalMinutos - intervaloMinutos;

  const oitoHorasEmMinutos = 8 * 60;
  if (tempoTrabalhoMinutos !== oitoHorasEmMinutos) {
    const horasTrabalhadas = tempoTrabalhoMinutos / 60;
    return {
      isValid: false,
      mensagemErro: `A jornada de trabalho deve ter exatamente 8 horas de trabalho líquido. Atualmente: ${horasTrabalhadas.toFixed(1)} horas.`
    };
  }

  if (intervaloMinutos !== 60 && intervaloMinutos !== 120) {
    const horasIntervalo = intervaloMinutos / 60;
    return {
      isValid: false,
      mensagemErro: `O intervalo deve ser de 1 ou 2 horas. Atualmente: ${horasIntervalo.toFixed(1)} horas.`
    };
  }

  if (intervaloInicio < inicio || intervaloFim > fim) {
    return { isValid: false, mensagemErro: 'O intervalo deve estar dentro do horário da jornada.' };
  }

  return { isValid: true, mensagemErro: '' };
}


  //#endregion

//#region  Carregar Horario
  carregarHorarios(): void {
    this.horariosService.buscarHorarios().subscribe({
      next: (response: any) => {
        console.log('Resposta da API:', response);
        
        const data = response.data || [];
        this.horarios = Array.isArray(data) ? data : [];
      },
      error: (err) => {
        console.error('Erro ao carregar horários:', err);
        this.modalService.erro("Erro","Ação não realizada, retorne e refaça.")
      }
    });

    


  }
  //#endregion

//#region formatar Hora

  formatarHora(isoString: string): string {
    if (!isoString) return '';
    const date = new Date(isoString + 'Z') ;
    if (isNaN(date.getTime())) {
      console.error(`Data inválida: ${isoString}`);
      return 'Horário inválido';
    }
    const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
  }

//#endregion

//#region Modal Adicionar
  abrirModalAdicionar(): void {
    Swal.fire({
      title: '<i class="bi bi-plus-circle " style="font-size: 3rem; color:#1F3E6A"></i> ',
      html: `
        <p>Adicionar</p>
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <label for="inicio">Horário de Início</label>
              <select id="inicio" class="form-select swal2-input">
                <option value="08:00" selected>08:00</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
              </select>
            </div>
            <div class="col-md-6">
              <label for="fim">Horário de Fim</label>
              <select id="fim" class="form-select swal2-input">
                <option value="17:00" selected>17:00</option>
                <option value="18:00">18:00</option>
                <option value="19:00">19:00</option>
                <option value="20:00">20:00</option>
              </select>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-md-6">
              <label for="inicioIntervalo">Início do Intervalo</label>
              <select id="inicioIntervalo" class="form-select swal2-input">
                <option value="12:00" selected>12:00</option>
                <option value="13:00">13:00</option>
              </select>
            </div>
            <div class="col-md-6">
              <label for="fimIntervalo">Fim do Intervalo</label>
              <select id="fimIntervalo" class="form-select swal2-input">
                <option value="13:00" selected>13:00</option>
                <option value="14:00">14:00</option>
              </select>
            </div>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Salvar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const inicio = (document.getElementById('inicio') as HTMLSelectElement).value;
        const fim = (document.getElementById('fim') as HTMLSelectElement).value;
        const inicioIntervalo = (document.getElementById('inicioIntervalo') as HTMLSelectElement).value;
        const fimIntervalo = (document.getElementById('fimIntervalo') as HTMLSelectElement).value;

        if (!inicio || !fim || !inicioIntervalo || !fimIntervalo) {
          Swal.showValidationMessage('Por favor, preencha todos os campos.');
          return;
        }

        const baseDate = '1900-01-14';
        const formatToISO = (date: string, time: string) => {
          return `${date}T${time}:00`;
        };

       const novoHorario ={
          horarioInicio: formatToISO(baseDate, inicio),
          horarioFim: formatToISO(baseDate, fim),
          intervaloInicio: formatToISO(baseDate, inicioIntervalo),
          intervaloFim: formatToISO(baseDate, fimIntervalo)
        };

        const validacao = this.ValidarHorario(novoHorario);
      if (!validacao.isValid) {
        Swal.showValidationMessage(validacao.mensagemErro);
        return;
      }
      return novoHorario;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const novoHorario: Horario = result.value;
        this.horariosService.adicionarHorario(novoHorario).subscribe({
          next: (horario: Horario) => {
            this.horarios.push(horario);
            this.modalService.sucesso("Sucesso!","Sua ação foi realizada com sucesso!")
            this.carregarHorarios();
          },
          error: (err) => {
            console.error('Erro ao adicionar horário:', err);
            this.modalService.erro("Erro","Ação não realizada, retorne e refaça.")
          }
        });
      }
    });
  }
//#endregion

//#region Modal Editar


  abrirModalEditar(horario: Horario, index: number): void {
    Swal.fire({
      title: '<i class="bi bi-pencil" style="font-size: 3rem; color:#1F3E6A"></i> ',
      html: `
      <p>Editar</p>
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <label for="inicio">Horário de Início</label>
              <select id="inicio" class="form-select swal2-input">
                <option value="08:00">08:00</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
              </select>
            </div>
            <div class="col-md-6">
              <label for="fim">Horário de Fim</label>
              <select id="fim" class="form-select swal2-input">
                <option value="17:00">17:00</option>
                <option value="18:00">18:00</option>
                <option value="19:00">19:00</option>
                <option value="20:00">20:00</option>
              </select>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-md-6">
              <label for="inicioIntervalo">Início do Intervalo</label>
              <select id="inicioIntervalo" class="form-select swal2-input">
                <option value="12:00">12:00</option>
                <option value="13:00">13:00</option>
              </select>
            </div>
            <div class="col-md-6">
              <label for="fimIntervalo">Fim do Intervalo</label>
              <select id="fimIntervalo" class="form-select swal2-input">
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
              </select>
            </div>
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Salvar',
      cancelButtonText: 'Cancelar',
      didOpen: () => {
        (document.getElementById('inicio') as HTMLSelectElement).value = this.formatarHora(horario.horarioInicio);
        (document.getElementById('fim') as HTMLSelectElement).value = this.formatarHora(horario.horarioFim);
        (document.getElementById('inicioIntervalo') as HTMLSelectElement).value = this.formatarHora(horario.intervaloInicio);
        (document.getElementById('fimIntervalo') as HTMLSelectElement).value = this.formatarHora(horario.intervaloFim);
      },
      preConfirm: () => {
        const inicio = (document.getElementById('inicio') as HTMLSelectElement).value;
        const fim = (document.getElementById('fim') as HTMLSelectElement).value;
        const inicioIntervalo = (document.getElementById('inicioIntervalo') as HTMLSelectElement).value;
        const fimIntervalo = (document.getElementById('fimIntervalo') as HTMLSelectElement).value;

        if (!inicio || !fim || !inicioIntervalo || !fimIntervalo) {
          Swal.showValidationMessage('Por favor, preencha todos os campos.');
          return;
        }

        const baseDate = '1900-01-14';
        const formatToISO = (date: string, time: string) => {
          return `${date}T${time}:00`;
        };

        const novoHorario = {
          horarioInicio: formatToISO(baseDate, inicio),
          horarioFim: formatToISO(baseDate, fim),
          intervaloInicio: formatToISO(baseDate, inicioIntervalo),
          intervaloFim: formatToISO(baseDate, fimIntervalo)
        };

        const validacao = this.ValidarHorario(novoHorario);
      if (!validacao.isValid) {
        Swal.showValidationMessage(validacao.mensagemErro);
        return;
      }
      return novoHorario;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const horarioAtualizado: Horario = { ...horario, ...result.value };
        this.horariosService.atualizarHorario(horario.id!, horarioAtualizado).subscribe({
          next: (horario: Horario) => {
            console.log('Resposta do PUT (editar) - JSON bruto:', JSON.stringify(horario));
            console.log('Resposta do PUT (editar):', horario);
            this.modalService.sucesso("Sucesso!","Sua ação foi realizada com sucesso!")
            this.carregarHorarios();
          },
          error: (err) => {
            console.error('Erro ao atualizar horário:', err);
            this.modalService.erro("Erro","Ação não realizada, retorne e refaça.")
          }
        });
      }
    });
  }
//#endregion

//#region Modal Exluir
excluirHorario(id: number, index:number):void{
  this.modalService.confirmar('Atenção','Deseja realmente excluir esse horário?').then((result) =>{
    if(result.isConfirmed){
      this.horariosService.excluirHorario(id).subscribe({
        next:(response) =>{
          console.log('resposta da exclusão:', response);
          this.modalService.sucesso("Sucesso!","Sua ação foi realizada com sucesso!")
          this.carregarHorarios();
        },
        error:(err) =>{
          console.log('Erro ao excluir horario', err);
          this.modalService.erro("Erro","Ação não realizada, retorne e refaça.")
        }
      });
    }
  });
}
          
   


//#endregion

}