/** Erreur à lancer quand un mot de passe ne passe pas les contraintes de complexités. */
export default class MotDePasseTropFaible extends Error {

	constructor(message: string) {
		super(message);
		this.name = 'MotDePasseTropFaible';

		// Restore prototype chain
		Object.setPrototypeOf(this, MotDePasseTropFaible.prototype);
	}
}
