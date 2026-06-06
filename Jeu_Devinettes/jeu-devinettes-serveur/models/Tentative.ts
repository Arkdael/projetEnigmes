export enum Resultat {
  CORRECT, INCORRECT
}

export default interface Tentative {
  id: number;
  joueurId: number;
  enigmeId: number;
  texte: string;
  resultat: Resultat;
}
