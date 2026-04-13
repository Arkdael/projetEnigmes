import { Router, Request, Response, NextFunction } from 'express';
import TentativeService from '../services/TentativeService';
import TentativeCreerDTO from '../models/transfert/TentativeCreer';

export default class TentativeRouter {

  private readonly router: Router;
  private tentativesService : TentativeService;
  constructor() {
    this.router = Router();
    this.tentativesService = TentativeService.getInstance();
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get('/:enigmeId/:joueurId', this.getTentatives.bind(this));
    this.router.post('/effectuer', this.effectuerTentative.bind(this));
  }

  private getTentatives(_req: Request, res: Response, _next: NextFunction): void {
    res.json(this.tentativesService.getTentatives(Number(_req.params.joueurId), Number(_req.params.enigmeId)));
  }

  private effectuerTentative(_req: Request, res: Response, _next: NextFunction): void {
    const tentative : TentativeCreerDTO = _req.body;
    res.json(this.tentativesService.effectuerTentative(tentative));
  }

  public getRouter(): Router {
    return this.router;
  }
}
