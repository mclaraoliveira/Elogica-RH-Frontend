export interface Funcionario {
  id: number;
  nome: string;
  cpf: string;
  dataNascimento: string;
  email: string;
  telefone: string;
  endereco: string;
  dataContratacao: string;
  salario: number;
  ativo: boolean;
  cargosId: number;
  setoresId: number;
  horariosId: number;
}
