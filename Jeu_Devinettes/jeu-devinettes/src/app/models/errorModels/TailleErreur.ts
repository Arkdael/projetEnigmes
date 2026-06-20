export default class InvalideErreur extends Error {
	public champ: string;
  public tailleMin: number;
  public tailleMax: number;
  
	constructor(message: string, champ: string, min: number, max: number) {
		super(message);
		this.name = 'TailleErreur';
		this.champ = champ;
    this.tailleMin = min;
    this.tailleMax = max;
		// Restore prototype chain
		Object.setPrototypeOf(this, InvalideErreur.prototype);
  }
}
