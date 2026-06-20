import ValidationError from "./errorModels/ValidationError";
import EnigmeCreerDTO from "./transfert/EnigmeCreer";

const TAILLE_MIN_CHAMP = 2;
const TAILLE_MAX_CHAMP = 255;

export default class Enigme {
	public id?: number; // Géré par la bd avec AUTO_INCREMENT.
	public question: string;
	public solution: string;
	public explication: string;

	constructor(enigmeCreerDTO: EnigmeCreerDTO) {
		this.validerDTO(enigmeCreerDTO);

		this.question = enigmeCreerDTO.texteEnigme;
		this.solution = enigmeCreerDTO.texteReponse;
		this.explication = enigmeCreerDTO.texteExplication;
	}

	private validerDTO(enigmeCreerDTO: EnigmeCreerDTO): void {
		// TODO Traduction des erreurs
		if(enigmeCreerDTO.texteEnigme.length < TAILLE_MIN_CHAMP || enigmeCreerDTO.texteEnigme.length > TAILLE_MAX_CHAMP) {
			throw new ValidationError(`Le champ doit être entre ${TAILLE_MIN_CHAMP} et ${TAILLE_MAX_CHAMP} caractères`, "texteEnigme");
		}
		if(enigmeCreerDTO.texteReponse.length < TAILLE_MIN_CHAMP || enigmeCreerDTO.texteReponse.length > TAILLE_MAX_CHAMP) {
			throw new ValidationError(`Le champ doit être entre ${TAILLE_MIN_CHAMP} et ${TAILLE_MAX_CHAMP} caractères`, "texteReponse");
		}
		if(enigmeCreerDTO.texteExplication.length < TAILLE_MIN_CHAMP || enigmeCreerDTO.texteExplication.length > TAILLE_MAX_CHAMP) {
			throw new ValidationError(`Le champ doit être entre ${TAILLE_MIN_CHAMP} et ${TAILLE_MAX_CHAMP} caractères`, "texteExplication");
		}
	}
}
