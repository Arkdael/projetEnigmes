import { Router } from "express";

export default abstract class RouterGenerique {
	protected readonly router: Router;

	constructor() {
		this.router = Router();
		this.initRoutes();
	}

	protected initRoutes(): void {
		// À surcharger dans les classes enfants.
	}

	public getRouter(): Router {
		return this.router;
	}
}