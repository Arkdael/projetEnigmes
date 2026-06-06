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

/** Prend un Resultat et retourne une clef de traduction. */
export function traduireResultat(resultat: Resultat): 'resultat_correct' | 'resultat_incorrect' {
  const traductionsResultat: Record<Resultat, 'resultat_correct' | 'resultat_incorrect'>= {
    [Resultat.CORRECT]: 'resultat_correct',
    [Resultat.INCORRECT]: 'resultat_incorrect'
  }
  return traductionsResultat[resultat];
}
