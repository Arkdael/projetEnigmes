export default class InvalideErreur extends Error {
	public champ: string|undefined;

	constructor(message: string, champ?: string) {
		super(message);
		this.name = 'ErreurValidation';
		this.champ = champ;
		
		// Restore prototype chain
		Object.setPrototypeOf(this, InvalideErreur.prototype);
  }
}
