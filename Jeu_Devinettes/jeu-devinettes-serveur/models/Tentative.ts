import ValidationError from "./errorModels/ValidationError";
import TentativeCreerDTO from "./transfert/TentativeCreer";

const TAILLE_MIN_CHAMP = 1;
const TAILLE_MAX_CHAMP = 256;

export enum Resultat {
	CORRECT, INCORRECT
}

export default class Tentative {
	public id?: number; // Géré par la bd avec AUTO_INCREMENT.
	public joueurId: number;
	public enigmeId: number;
	public texte: string;
	public resultat: Resultat;

	constructor(tentativeCreerDTO: TentativeCreerDTO, resultat: Resultat) {
		this.validerDTO(tentativeCreerDTO);

		this.joueurId = tentativeCreerDTO.joueurId;
		this.enigmeId = tentativeCreerDTO.enigmeId;
		this.texte = tentativeCreerDTO.tentativeTexte;
		this.resultat = resultat;
	}

	private validerDTO(dto: TentativeCreerDTO): void {
		// TODO traduire erreur.
		if(dto.tentativeTexte.length < TAILLE_MIN_CHAMP || dto.tentativeTexte.length > TAILLE_MAX_CHAMP) {
			throw new ValidationError(`Le champ doit être entre ${TAILLE_MIN_CHAMP} et ${TAILLE_MAX_CHAMP} caractères`, "tentativeTexte");
		}
	}
}
