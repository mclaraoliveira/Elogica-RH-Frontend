export interface Menu {
  id: number;
  titulo: string;
  descricao: string;
  url: string | null;
  icone: string | null;
  ordem: number;
  menuPaiId: number;
}
