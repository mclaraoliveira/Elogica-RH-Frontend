import { Component } from '@angular/core';
import { HorariosService } from '../../services/horarios.service';
import { CommonModule } from '@angular/common';
import { Horario } from '../../shared/interfaces/horario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-horarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './horarios.component.html',
  styleUrl: './horarios.component.css'
})
export class HorariosComponent {

  horarios: any[] = [];

  constructor(private horariosService: HorariosService) { }

  ngOnInit(): void {
    this.carregarHorarios();
  }

  carregarHorarios(): void {
    this.horariosService.getHorarios().subscribe({
      next: (response: any) => {
        console.log('Resposta da API:', response);
        
        const data = response.data || [];
        this.horarios = Array.isArray(data) ? data : [];
      },
      error: (err) => {
        console.error('Erro ao carregar horários:', err);
        Swal.fire('Erro', 'Não foi possível carregar os horários.', 'error');
      }
    });



  }

  
  formatarHora(isoString: string): string {
    if (!isoString) return '';
    const date = new Date(isoString);
    if (isNaN(date.getTime())) {
      console.error(`Data inválida: ${isoString}`);
      return 'Horário inválido';
    }
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  abrirModalAdicionar(): void {
    Swal.fire({
      title: '<i class="bi bi-plus-circle"></i> Adicionar',
      html: `
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

        return {
          horarioInicio: formatToISO(baseDate, inicio),
          horarioFim: formatToISO(baseDate, fim),
          intervaloInicio: formatToISO(baseDate, inicioIntervalo),
          intervaloFim: formatToISO(baseDate, fimIntervalo)
        };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const novoHorario: Horario = result.value;
        this.horariosService.adicionarHorario(novoHorario).subscribe({
          next: (horario: Horario) => {
            this.horarios.push(horario);
            Swal.fire('Sucesso', 'Sua ação foi realizada com sucesso!', 'success');
          },
          error: (err) => {
            console.error('Erro ao adicionar horário:', err);
            Swal.fire('Erro', 'Não foi possível adicionar o horário.', 'error');
          }
        });
      }
    });
  }

  abrirModalEditar(horario: Horario, index: number): void {
    Swal.fire({
      title: '<i class="bi bi-pen"></i> Editar',
      html: `
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

        return {
          horarioInicio: formatToISO(baseDate, inicio),
          horarioFim: formatToISO(baseDate, fim),
          intervaloInicio: formatToISO(baseDate, inicioIntervalo),
          intervaloFim: formatToISO(baseDate, fimIntervalo)
        };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const horarioAtualizado: Horario = { ...horario, ...result.value };
        this.horariosService.atualizarHorario(horario.id!, horarioAtualizado).subscribe({
          next: (horario: Horario) => {
            this.horarios[index] = horario;
            Swal.fire('Sucesso', 'Horário atualizado com sucesso!', 'success');
          },
          error: (err) => {
            console.error('Erro ao atualizar horário:', err);
            Swal.fire('Erro', 'Não foi possível atualizar o horário.', 'error');
          }
        });
      }
    });
  }
}