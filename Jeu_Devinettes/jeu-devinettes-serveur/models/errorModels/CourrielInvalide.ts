/** Erreur à lancer quand une chaine n'as pas la structure qu'on attend d'une adresse courriel valide. */
export default class CourrielInvalide extends Error {

	constructor(message: string) {
		super(message);
		this.name = 'CourrielInvalide';

		// Restore prototype chain
		Object.setPrototypeOf(this, CourrielInvalide.prototype);
	}
}
