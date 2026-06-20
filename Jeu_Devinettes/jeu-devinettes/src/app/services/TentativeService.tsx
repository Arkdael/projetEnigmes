import { StatusCodes } from "http-status-codes";
import Tentative from "../models/Tentative";
import TentativeCreerDTO from "../models/transfert/TentativeCreer";
import HttpService from "./HttpService";
import IntrouvableErreur from "../models/errorModels/IntrouvableErreur";
import { m } from "@/src/paraglide/messages";

export default class TentativeService extends HttpService<Tentative> {
	protected override readonly apiUrl: string = `${this.apiUrl}/tentatives`;
	private static readonly CLEF_TENTATIVES = "tentatives";

	public async getTentatives(joueurId?: number, enigmeId?: number) {
		/*const reponse = await fetch(`${this.apiUrl}/${enigmeId}/${joueurId}`);
		
		switch(reponse.status) {
			case StatusCodes.OK:
				//return await reponse.json() as Tentative[];
			case StatusCodes.NOT_FOUND:
		throw new IntrouvableErreur(m.erreur_introuvable_specifique({genre: m.enigme_genre(), objet: m.enigme_nom({count: 1}), clef: "id", valeur: enigmeId ?? 'undefined'}), m.enigme_nom({count: 1}), enigmeId);
			default:
				throw new Error(m.erreur_inattendue_generique());
		}*/
		const tentatives = JSON.parse(localStorage.getItem(TentativeService.CLEF_TENTATIVES) ?? "") as Tentative[];
		return tentatives.filter((tentative: Tentative) => {
			return (joueurId == undefined || tentative.joueurId == joueurId) && (enigmeId == undefined || tentative.enigmeId == enigmeId)
		});
	}

	public async effectuerTentative(tentativeDTO: TentativeCreerDTO) {
		const reponse = await fetch(`${this.apiUrl}/effectuer`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(tentativeDTO),
		});

		switch(reponse.status) {
			case StatusCodes.OK:
				var nouvelleTentative = await reponse.json() as Tentative;
				var tentatives = await this.getTentatives();
				tentatives.push(nouvelleTentative);
				localStorage.setItem(TentativeService.CLEF_TENTATIVES, JSON.stringify(tentatives));

				return nouvelleTentative;
			case StatusCodes.CREATED:
				var nouvelleTentative = await reponse.json() as Tentative;
				var tentatives = await this.getTentatives();
				tentatives.push(nouvelleTentative);
   			localStorage.setItem(TentativeService.CLEF_TENTATIVES, JSON.stringify(tentatives));

				console.log(localStorage.getItem(TentativeService.CLEF_TENTATIVES));
				return nouvelleTentative;
			case StatusCodes.NOT_FOUND:
				throw new IntrouvableErreur(m.erreur_introuvable_specifique({genre: m.enigme_genre(), objet: m.enigme_nom({count: 1}), clef: "id", valeur: tentativeDTO.enigmeId}), m.enigme_nom({count: 1}), tentativeDTO.enigmeId);
			default:
				throw new Error(m.erreur_inattendue_generique());
		}
	}
}
