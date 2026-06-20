import { Request, Response, NextFunction } from 'express';
import RouterGenerique from './router';

export default class IndexRouter extends RouterGenerique {
	constructor() {
		super();
	}

	protected initRoutes(): void {
		this.router.get('/', this.getIndex.bind(this));
		// ajouter d'autres routes ici, par exemple:
		// this.router.post('/submit', this.postSubmit.bind(this));
	}

	private getIndex(_req: Request, res: Response, _next: NextFunction): void {
		res.send('index — Express (class)');
	}
}
