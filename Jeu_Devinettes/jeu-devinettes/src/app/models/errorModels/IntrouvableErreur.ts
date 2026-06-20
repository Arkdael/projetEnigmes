/** Erreur à lancer quand une entitée avec une certaine valeur n'est pas trouvée. */
export default class IntrouvableErreur extends Error {
	public champ: string|undefined;
	public valeur: any|undefined;

	constructor(message: string, champ?: string, valeur?: any) {
		super(message);
		this.name = 'IntrouvableErreur';
		this.champ = champ;
		this.valeur = valeur;

		// Restore prototype chain
		Object.setPrototypeOf(this, IntrouvableErreur.prototype);
	}
}
