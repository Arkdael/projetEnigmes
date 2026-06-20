import { hash } from "node:crypto";
import JoueurCreerDTO from "./transfert/JoueurCreer";
import ValidationError from "./errorModels/ValidationError";
import CourrielInvalide from "./errorModels/CourrielInvalide";
import MotDePasseTropFaible from "./errorModels/MotDePasseTropFaible";

const TAILLE_MIN_CHAMP = 2;
const TAILLE_MAX_CHAMP = 255;

export default class Joueur {
	public id?: number; // Géré par la bd avec AUTO_INCREMENT.
	public nom: string;
	public courriel: string;
	public empreinteMotDePasse: string;

	constructor(joueurCreerDTO: JoueurCreerDTO) {
		this.validerDTO(joueurCreerDTO);

		this.nom = joueurCreerDTO.nom;
		this.courriel = joueurCreerDTO.courriel;
		this.empreinteMotDePasse = hash('sha128', joueurCreerDTO.motDePasse);
	}

	private validerDTO(dto: JoueurCreerDTO): void {
		// TODO traduire erreur.
		if(dto.nom.length < TAILLE_MIN_CHAMP || dto.nom.length > TAILLE_MAX_CHAMP) {
			throw new ValidationError(`Le champ doit être entre ${TAILLE_MIN_CHAMP} et ${TAILLE_MAX_CHAMP} caractères`, "nom");
		}
		if(dto.courriel.length < TAILLE_MIN_CHAMP || dto.courriel.length > TAILLE_MAX_CHAMP) {
			throw new ValidationError(`Le champ doit être entre ${TAILLE_MIN_CHAMP} et ${TAILLE_MAX_CHAMP} caractères`, "courriel");
		}
		if(dto.motDePasse.length < TAILLE_MIN_CHAMP || dto.motDePasse.length > TAILLE_MAX_CHAMP) {
			throw new ValidationError(`Le champ doit être entre ${TAILLE_MIN_CHAMP} et ${TAILLE_MAX_CHAMP} caractères`, "motDePasse");
		}

		// Une chaine + @ + une chaine + . + une chaine d'au moins 2 lettres.
		const formatCourriel: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		if(!formatCourriel.test(dto.courriel)) {
			throw new CourrielInvalide("Format de courriel invalide.");
		}

		// Au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractères spécial.
		const forceMotDePasse: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		if(!forceMotDePasse.test(dto.motDePasse)) {
			throw new MotDePasseTropFaible("Mot de passe trop faible. Il faut au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractères spécial.");
		}
	}
}
