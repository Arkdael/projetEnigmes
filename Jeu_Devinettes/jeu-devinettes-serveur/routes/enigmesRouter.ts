import { Request, Response, NextFunction } from 'express';
import EnigmeService from '../services/EnigmeService';
import EnigmeCreerDTO from '../models/transfert/EnigmeCreer';
import Enigme from '../models/Enigme';
import ValidationError from '../models/errorModels/ValidationError';
import { StatusCodes } from 'http-status-codes';
import RouterGenerique from './router';
import NotFoundError from '../models/errorModels/NotFoundError';

export default class EnigmesRouter extends RouterGenerique {
	private readonly enigmeService: EnigmeService;

	constructor() {
		super();
		this.enigmeService = EnigmeService.getInstance();
	}

	protected initRoutes(): void {
		this.router.get('/', this.getEnigmes.bind(this));
		this.router.get('/:id', this.getEnigme.bind(this));
		this.router.post('/creer', this.creerEnigme.bind(this));
	}

	private async getEnigmes(_req: Request, res: Response, _next: NextFunction): Promise<Response> {
		try {
			const enigmes: Enigme[] = await this.enigmeService.getEnigmes();
			return res.status(StatusCodes.OK).json(enigmes);
		}
		catch(erreur: any) {
			switch(true) {
				default: {
					return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(erreur.message);
				}
			}
		}
	}

	private async getEnigme(_req: Request, res: Response, _next: NextFunction): Promise<Response> {
		// TODO validations des paramètres et gestion d'erreurs.
		try {
			const enigme: Enigme = await this.enigmeService.getEnigme(Number.parseInt(_req.params.id?.toString() ?? "0"));
			return res.status(StatusCodes.OK).json(enigme);
		}
		catch(erreur: any) {
			switch(true) {
				case erreur instanceof NotFoundError: {
					return res.status(StatusCodes.NOT_FOUND).json(erreur.message);
				}
				default: {
					return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(erreur.message);
				}
			}
		}
	}

	private async creerEnigme(_req: Request, res: Response, _next: NextFunction): Promise<Response> {
		try {
			const enigmeDTO: EnigmeCreerDTO = _req.body;
			const enigme = await this.enigmeService.addEnigme(enigmeDTO);
			return res.status(StatusCodes.CREATED).json(enigme);
		}
		catch(erreur: any) {
			switch(true) {
				case erreur instanceof ValidationError: {
					return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(erreur.message);
				}
				default: {
					return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(erreur.message);
				}
			}
		}
	}
}
