/** Erreur à lancer quand une entitée avec une certaine valeur n'est pas trouvée. */
export default class NotFoundError extends Error {
	public field: string|undefined;
	public value: any|undefined;

	constructor(message: string, field?: string, value?: any) {
		super(message);
		this.name = 'NotFoundError';
		this.field = field;
		this.value = value;

		// Restore prototype chain
		Object.setPrototypeOf(this, NotFoundError.prototype);
	}
}
