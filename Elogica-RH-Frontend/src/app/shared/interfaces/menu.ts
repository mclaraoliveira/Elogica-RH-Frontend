export interface Menu {
  id: number | undefined
  titulo: string
  descricao: string
  url: string
  icone: string
  ordem: number
  menuPaiId: number
}
