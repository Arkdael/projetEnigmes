import Enigme from "../models/Enigme";
import EnigmeCreerDTO from "../models/transfert/EnigmeCreer";
import FournisseurConnexion from "../bd"
import { SqlError } from "mariadb/*";
import { NOTFOUND } from "node:dns";

class EnigmeService {
  private static instance: EnigmeService;
  private static readonly TAILLE_MIN_CHAMP = 1;
  private static readonly TAILLE_MAX_CHAMP = 256;
  private connexion;

  constructor() {
    this.connexion = FournisseurConnexion.getInstance().getConnexion();
  }
  
  public static getInstance(): EnigmeService {
    if(!EnigmeService.instance) {
      EnigmeService.instance = new EnigmeService();
    }
    return EnigmeService.instance;
  }

  public async getEnigmes(): Promise<Enigme[]> {
    const enigmes: Enigme[] = await (await this.connexion).query('SELECT * FROM Enigmes;') as Enigme[];
    return enigmes;
  }

  public async getEnigmesFiltres(): Promise<Enigme[]> {
    const enigmes: Enigme[] = await this.getEnigmes();
    return enigmes.sort((a, b) => {
      return a.question.toUpperCase() <= b.question.toUpperCase() ? -1 : 1;
    });
  }

  public async getEnigme(enigmeId: number): Promise<Enigme> {
    //const enigme: Enigme|undefined = this.enigmes.find(enigme => enigme.id == enigmeId);
    const enigme: Enigme|undefined = (await (await this.connexion).query(`SELECT * FROM Enigmes WHERE id = ${enigmeId} LIMIT 1;`))[0] as Enigme|undefined;
    if(!enigme) {
      throw NOTFOUND;
    }
    return enigme;
  }

  public async addEnigme(dto: EnigmeCreerDTO): Promise<Enigme[]|void> {
    // TODO gestion d'erreur.
    if(dto.texteEnigme.length < EnigmeService.TAILLE_MIN_CHAMP || dto.texteEnigme.length > EnigmeService.TAILLE_MAX_CHAMP) {
      return;
    }
    if(dto.texteReponse.length < EnigmeService.TAILLE_MIN_CHAMP || dto.texteReponse.length > EnigmeService.TAILLE_MAX_CHAMP) {
      return;
    }
    if(dto.texteExplication.length < EnigmeService.TAILLE_MIN_CHAMP || dto.texteExplication.length > EnigmeService.TAILLE_MAX_CHAMP) {
      return;
    }

    const requete = 'INSERT INTO Enigmes (question, solution, explication) VALUES (?, ?, ?);';
    const reponse = await (await this.connexion).query(requete, [dto.texteEnigme, dto.texteReponse, dto.texteExplication]);
    console.log(reponse);

    /*const nouvelleEnigme: Enigme = {
      id: this.enigmes.length + 1,
      question: dto.texteEnigme,
      solution: dto.texteReponse,
      explication: dto.texteExplication,
    };*/

    //this.enigmes.push(nouvelleEnigme);
    return await this.getEnigmes();
  }
}

export default EnigmeService;
