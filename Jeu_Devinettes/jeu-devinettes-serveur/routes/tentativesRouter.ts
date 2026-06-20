import { Request, Response, NextFunction } from 'express';
import TentativeService from '../services/TentativeService';
import TentativeCreerDTO from '../models/transfert/TentativeCreer';
import Tentative from '../models/Tentative';
import { StatusCodes } from 'http-status-codes';
import RouterGenerique from './router';
import ValidationError from '../models/errorModels/ValidationError';
import NotFoundError from '../models/errorModels/NotFoundError';

export default class TentativeRouter extends RouterGenerique {
	private readonly tentativesService: TentativeService;

	constructor() {
		super();
		this.tentativesService = TentativeService.getInstance();
	}

	protected override initRoutes(): void {
		this.router.get('/:enigmeId/:joueurId', this.getTentatives.bind(this));
		this.router.post('/effectuer', this.effectuerTentative.bind(this));
	}

	private async getTentatives(_req: Request, res: Response, _next: NextFunction): Promise<Response> {
		try {
			const tentatives = await this.tentativesService.getTentatives(Number(_req.params.joueurId), Number(_req.params.enigmeId));
			return res.status(StatusCodes.OK).json(tentatives);
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

	private async effectuerTentative(_req: Request, res: Response, _next: NextFunction): Promise<Response> {
		try {
			const tentativeDTO: TentativeCreerDTO = _req.body;
			const tentative: Tentative = await this.tentativesService.effectuerTentative(tentativeDTO);
			return res.status(StatusCodes.CREATED).json(tentative);
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
