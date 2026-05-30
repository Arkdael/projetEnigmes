import EnigmeService from "./EnigmeService";
import type Tentative from "../models/Tentative";
import TentativeCreerDTO from "../models/transfert/TentativeCreer";

class TentativeService {
  private static instance: TentativeService;
  private tentatives: Tentative[] = [];
  private static readonly TAILLE_MIN_CHAMP = 1;
  private static readonly TAILLE_MAX_CHAMP = 256;
  private enigmeService : EnigmeService = EnigmeService.getInstance();

  constructor() {}

  public static getInstance(): TentativeService {
    if (!TentativeService.instance) {
      TentativeService.instance = new TentativeService();
    }
    return TentativeService.instance;
  }
  
  public getAllTentatives() {
    return this.tentatives;
  }
  
  public getTentatives(joueurId: number, enigmeId: number) {
    const tentatives = this.tentatives.filter(tentative => tentative.joueurId == joueurId && tentative.enigmeId == enigmeId);
    return tentatives;
  }

  public effectuerTentative(dto: TentativeCreerDTO) {
    if(dto.tentativeTexte.length < TentativeService.TAILLE_MIN_CHAMP || dto.tentativeTexte.length > TentativeService.TAILLE_MAX_CHAMP) {
      // TODO gestion d'erreur.
      return;
    }
    const enigme = this.enigmeService.getEnigme(dto.enigmeId);
    const resultat = dto.tentativeTexte.toLowerCase() == enigme?.solution.toLowerCase() ? "Correct" : "Incorrect";

    const nouvelleTentative: Tentative = {
      id: this.tentatives.length + 1,
      joueurId: dto.joueurId,
      enigmeId: dto.enigmeId, 
      texte: dto.tentativeTexte,
      resultat: resultat
    };
    this.tentatives.push(nouvelleTentative);
    return nouvelleTentative;
  }
}

export default TentativeService;
