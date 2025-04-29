export interface Cargo {
  id: number;
  titulo: string;
  descricao: string;
  salarioBase: number;
  setores: Setor[];
}

export interface Setor {
  id: number;
  nome: string;
}

export interface CargoDto {
  titulo: string;
  descricao: string;
  salarioBase: number;
}

export interface AtualizarCargoDto {
  titulo: string;
  descricao: string;
  salarioBase: number;
}

