export interface ItemMenu {
  id: number | undefined;
  titulo: string;
  descricao: string;
  url: string | null;
  icone: string | null;
  ordem: number;
  menuPaiId: number;
}
