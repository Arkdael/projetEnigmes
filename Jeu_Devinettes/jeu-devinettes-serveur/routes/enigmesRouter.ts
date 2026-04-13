import { Router, Request, Response, NextFunction } from 'express';
import EnigmeService from '../services/EnigmeService';
import EnigmeCreerDTO from '../models/transfert/EnigmeCreer';

export default class EnigmesRouter {

  private readonly router: Router;
  private enigmeService : EnigmeService;
  constructor() {
    this.router = Router();
    this.enigmeService = EnigmeService.getInstance();
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get('/', this.getEnigmes.bind(this));
    this.router.get('/:id', this.getEnigme.bind(this));
    this.router.post('/creer', this.creerEnigme.bind(this));
  }

  private getEnigmes(_req: Request, res: Response, _next: NextFunction): void {
    res.json(this.enigmeService.getEnigmes());
  }

  private getEnigme(_req: Request, res: Response, _next: NextFunction): void {
    console.log(_req.params.id);
    res.json(this.enigmeService.getEnigme(Number.parseInt(_req.params.id?.toString() ?? "0")));
  }

  private creerEnigme(_req: Request, res: Response, _next: NextFunction): void {
    const enigme : EnigmeCreerDTO = _req.body;
    res.json(this.enigmeService.addEnigme(enigme));
  }

  public getRouter(): Router {
    return this.router;
  }
}
