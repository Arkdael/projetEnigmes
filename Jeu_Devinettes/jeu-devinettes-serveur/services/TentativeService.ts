import EnigmeService from "./EnigmeService";
import type Tentative from "../models/Tentative";
import TentativeCreerDTO from "../models/transfert/TentativeCreer";
import { Resultat } from "../models/Tentative";
import FournisseurConnexion from "../bd";

class TentativeService {
  private static instance: TentativeService;
  //private tentatives: Tentative[] = [];
  private static readonly TAILLE_MIN_CHAMP = 1;
  private static readonly TAILLE_MAX_CHAMP = 256;
  private enigmeService : EnigmeService = EnigmeService.getInstance();
  private connexion;
  constructor() {
    this.connexion = FournisseurConnexion.getInstance().getConnexion();
  }

  public static getInstance(): TentativeService {
    if(!TentativeService.instance) {
      TentativeService.instance = new TentativeService();
    }
    return TentativeService.instance;
  }
  
  public async getAllTentatives(): Promise<Tentative[]> {
    const tentatives: Tentative[] = await (await this.connexion).query('SELECT * FROM Tentatives;') as Tentative[];
    return tentatives;
  }
  
  public async getTentatives(joueurId: number, enigmeId: number): Promise<Tentative[]> {
    const tentatives: Tentative[] = await (await this.connexion).query(`SELECT * FROM Tentatives WHERE joueurId = ${joueurId} AND enigmeId = ${enigmeId};`) as Tentative[];
    console.log(tentatives);
    return tentatives;
  }

  public async effectuerTentative(dto: TentativeCreerDTO): Promise<Tentative> {
    if(dto.tentativeTexte.length < TentativeService.TAILLE_MIN_CHAMP || dto.tentativeTexte.length > TentativeService.TAILLE_MAX_CHAMP) {
      // TODO gestion d'erreur.
      throw new Error('VALIDATION');
    }
    const enigme = await this.enigmeService.getEnigme(dto.enigmeId);
    const resultat = dto.tentativeTexte.toLowerCase() == enigme?.solution.toLowerCase() ? Resultat.CORRECT : Resultat.INCORRECT;

    /*const nouvelleTentative: Tentative = {
      id: this.tentatives.length + 1,
      joueurId: dto.joueurId,
      enigmeId: dto.enigmeId, 
      texte: dto.tentativeTexte,
      resultat: resultat
    };*/
    //this.tentatives.push(nouvelleTentative);
    const requete = 'INSERT INTO Tentatives (joueurId, enigmeId, texte, resultat) VALUES (?, ?, ?, ?);';
    const reponse = await (await this.connexion).query(requete, [dto.joueurId, dto.enigmeId, dto.tentativeTexte, resultat]);
    const tentatives = (await this.getTentatives(dto.joueurId, dto.enigmeId));
    const tentative = tentatives[tentatives.length -1]!;
    console.log(tentative);
    return tentative;
  }
}

export default TentativeService;
