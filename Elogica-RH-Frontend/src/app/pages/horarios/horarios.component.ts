import { Component } from '@angular/core';
import { HorariosService } from '../../services/horarios.service';
import { CommonModule } from '@angular/common';

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

  ngOnInit(): void{
    this.listarHorarios();
  }


  listarHorarios():void{
    this.horariosService.getHorarios().subscribe(data =>{
      this.horarios = data;
    });
  }
  adicionarHorarios(novoHorario: any):void {
    this.horariosService.adicionarHorario(novoHorario).subscribe(data =>{
      this.horarios.push(data);
    })
  }
}
