import Enigme from "../models/Enigme";
import EnigmeCreerDTO from "../models/transfert/EnigmeCreer";
import FournisseurConnexion from "../bd";
import { NOTFOUND } from "node:dns";
import NotFoundError from "../models/errorModels/NotFoundError";

class EnigmeService {
	private static instance: EnigmeService;
	private readonly connexion;

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
		const enigme: Enigme|undefined = (await (await this.connexion).query(`SELECT * FROM Enigmes WHERE id = ${enigmeId} LIMIT 1;`))[0] as Enigme|undefined;
		if(!enigme) { 
			throw new NotFoundError('not found', Enigme.prototype.id?.toString(), enigmeId);
		}
		return enigme;
	}

	public async addEnigme(dto: EnigmeCreerDTO): Promise<Enigme[]> {
		const nouvelleEnigme: Enigme = new Enigme(dto);

		const requete = 'INSERT INTO Enigmes (question, solution, explication) VALUES (?, ?, ?);';
		const reponse = await (await this.connexion).query(requete, [nouvelleEnigme.question, nouvelleEnigme.solution, nouvelleEnigme.explication]);

		return await this.getEnigmes();
	}
}

export default EnigmeService;
