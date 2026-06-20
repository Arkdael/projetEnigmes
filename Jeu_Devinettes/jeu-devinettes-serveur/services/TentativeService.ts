import EnigmeService from "./EnigmeService";
import Tentative from "../models/Tentative";
import TentativeCreerDTO from "../models/transfert/TentativeCreer";
import { Resultat } from "../models/Tentative";
import FournisseurConnexion from "../bd";
import NotFoundError from "../models/errorModels/NotFoundError";
import Enigme from "../models/Enigme";

class TentativeService {
	private static instance: TentativeService;
	private readonly enigmeService : EnigmeService = EnigmeService.getInstance();
	private readonly connexion;
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
		if(!tentatives) { 
			throw new NotFoundError('not found', Enigme.prototype.id?.toString(), enigmeId);
		}
		return tentatives;
	}

	public async effectuerTentative(dto: TentativeCreerDTO): Promise<Tentative> {
		try {
			const enigme = await this.enigmeService.getEnigme(dto.enigmeId);
			const resultat = dto.tentativeTexte.toLowerCase() == enigme?.solution.toLowerCase() ? Resultat.CORRECT : Resultat.INCORRECT;

			const nouvelleTentative: Tentative = new Tentative(dto, resultat);

			const requete = 'INSERT INTO Tentatives (joueurId, enigmeId, texte, resultat) VALUES (?, ?, ?, ?);';
			const reponse = await (await this.connexion).query(requete, [nouvelleTentative.joueurId, nouvelleTentative.enigmeId, nouvelleTentative.texte, nouvelleTentative.resultat]);

			return nouvelleTentative;
		}
		catch(erreur: any) {
			throw erreur;
		}
	}
}

export default TentativeService;
