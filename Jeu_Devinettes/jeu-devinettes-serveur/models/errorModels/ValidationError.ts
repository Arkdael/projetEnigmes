export default class ValidationError extends Error {
	public field: string|undefined;

	constructor(message: string, field?: string) {
		super(message);
		this.name = 'ValidationError';
		this.field = field;
		// Restore prototype chain
		Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
