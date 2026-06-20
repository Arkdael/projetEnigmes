import TentativeService from "../../services/TentativeService";
import TailleErreur from "../errorModels/TailleErreur";

export default class TentativeCreerDTO {
	public joueurId: number;
	public enigmeId: number;
	public tentativeTexte: string;

	constructor(joueurId: number, enigmeId: number, tentativeTexte: string) {
		if(tentativeTexte.length < TentativeService.TAILLE_MIN_CHAMP || tentativeTexte.length > TentativeService.TAILLE_MAX_CHAMP) {
			throw new TailleErreur("Taille du texte en dehors des limites", "tentative_nom", TentativeService.TAILLE_MIN_CHAMP, TentativeService.TAILLE_MAX_CHAMP);
		}
		this.joueurId = joueurId;
		this.enigmeId = enigmeId;
		this.tentativeTexte = tentativeTexte;
	}
}
