import { Router, Request, Response, NextFunction } from 'express';
import TentativeService from '../services/TentativeService';
import TentativeCreerDTO from '../models/transfert/TentativeCreer';
import Tentative from '../models/Tentative';

export default class TentativeRouter {

  private readonly router: Router;
  private tentativesService: TentativeService;
  constructor() {
    this.router = Router();
    this.tentativesService = TentativeService.getInstance();
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get('/:enigmeId/:joueurId', this.getTentatives.bind(this));
    this.router.post('/effectuer', this.effectuerTentative.bind(this));
  }

  private async getTentatives(_req: Request, res: Response, _next: NextFunction): Promise<void> {
    const tentatives = await this.tentativesService.getTentatives(Number(_req.params.joueurId), Number(_req.params.enigmeId));
    console.log("Routeur tentatives");
    res.status(200).json(tentatives);
  }

  private async effectuerTentative(_req: Request, res: Response, _next: NextFunction): Promise<void> {
    const tentativeDTO: TentativeCreerDTO = _req.body;
    const tentative: Tentative = await this.tentativesService.effectuerTentative(tentativeDTO);
    res.status(200).json(tentative);
  }

  public getRouter(): Router {
    return this.router;
  }
}
