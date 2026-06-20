import { StatusCodes } from 'http-status-codes';
import IntrouvableErreur from '../models/errorModels/IntrouvableErreur';
import InvalideErreur from '../models/errorModels/InvalideErreur';
import { m } from '@/src/paraglide/messages';

interface IObjet {
	id: number;
}

export default abstract class HttpService<TObjet extends IObjet> {
	protected readonly apiUrl: string = "http://localhost:4200";
	public static TAILLE_MIN_CHAMP = 1;
	public static TAILLE_MAX_CHAMP = 32;

	constructor() {}

	public async recuperer(id: number): Promise<TObjet>  {
		const reponse: Response = await fetch(`${this.apiUrl}/${id}`);
		switch(reponse.status) {
			case StatusCodes.OK:
				return await reponse.json() as TObjet;
			case StatusCodes.NOT_FOUND:
				throw new IntrouvableErreur(m.erreur_introuvable_generique(), "id", id);
			default:
				throw new Error(m.erreur_inattendue_generique());
		}
	}

	public async recupererTout(): Promise<TObjet[]> {
		const reponse = await fetch(`${this.apiUrl}/`);

		switch(reponse.status) {
			case StatusCodes.OK:
				return await reponse.json() as TObjet[];
			default:
				throw new Error(m.erreur_inattendue_generique());
		}
	}

	public async creer(dto : any): Promise<TObjet> {
		const reponse = await fetch(`${this.apiUrl}/creer`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(dto),
		});

		switch(reponse.status) {
			case StatusCodes.OK:
				return await reponse.json() as TObjet;
			case StatusCodes.CREATED:
				return await reponse.json() as TObjet;
			case StatusCodes.UNPROCESSABLE_ENTITY:
				throw new InvalideErreur("");
			default:
				console.log(reponse);
				throw new Error(m.erreur_inattendue_generique());
		}
	}

	/** Pas implémenté, méthode pour modifier un objet via son id. */
	public async modifier(id: number, donnees: any): Promise<TObjet> {
		const reponse = await fetch(`${this.apiUrl}/modifier`);
		switch(reponse.status) {
			case StatusCodes.OK:
				return await reponse.json() as TObjet;
			case StatusCodes.NOT_FOUND:
				throw new IntrouvableErreur(m.erreur_introuvable_generique(), "id", id);
			default:
				throw new Error(m.erreur_inattendue_generique());
		}
	}

	/** Pas implémenté, méthode pour supprimer un objet via son id. */
	public async supprimer(id: number): Promise<boolean> {
		const reponse = await fetch(`${this.apiUrl}/supprimer`);
		switch(reponse.status) {
			case StatusCodes.OK:
				return true;
			case StatusCodes.NO_CONTENT:
				return true;
			case StatusCodes.NOT_FOUND:
				throw new IntrouvableErreur(m.erreur_introuvable_generique(), "id", id);
			default:
				throw new Error(m.erreur_inattendue_generique());
		}
	}
}
