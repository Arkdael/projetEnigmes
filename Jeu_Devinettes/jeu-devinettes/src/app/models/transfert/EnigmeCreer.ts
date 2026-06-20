import EnigmeService from "../../services/EnigmeService";
import TailleErreur from "../errorModels/TailleErreur";

export default class EnigmeCreerDTO {
	public texteEnigme: string;
	public texteReponse: string;
	public texteExplication: string;

	constructor(question: string, reponse: string, explication: string) {
		if(question.length < EnigmeService.TAILLE_MIN_CHAMP || question.length > EnigmeService.TAILLE_MAX_CHAMP) {
			throw new TailleErreur("Taille du texte en dehors des limites", "enigme_creer_champQuestion", EnigmeService.TAILLE_MIN_CHAMP, EnigmeService.TAILLE_MAX_CHAMP);
		}
		if(reponse.length < EnigmeService.TAILLE_MIN_CHAMP || reponse.length > EnigmeService.TAILLE_MAX_CHAMP) {
			throw new TailleErreur("Taille du texte en dehors des limites", "enigme_creer_champReponse", EnigmeService.TAILLE_MIN_CHAMP, EnigmeService.TAILLE_MAX_CHAMP);
		}
		if(explication.length < EnigmeService.TAILLE_MIN_CHAMP || explication.length > EnigmeService.TAILLE_MAX_CHAMP) {
			throw new TailleErreur("Taille du texte en dehors des limites", "enigme_creer_champExplication", EnigmeService.TAILLE_MIN_CHAMP, EnigmeService.TAILLE_MAX_CHAMP);
		}

		this.texteEnigme = question;
		this.texteReponse = reponse;
		this.texteExplication = explication;
	}
}
