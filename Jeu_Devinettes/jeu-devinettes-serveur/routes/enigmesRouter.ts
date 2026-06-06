import { Router, Request, Response, NextFunction } from 'express';
import EnigmeService from '../services/EnigmeService';
import EnigmeCreerDTO from '../models/transfert/EnigmeCreer';
import Enigme from '../models/Enigme';

export default class EnigmesRouter {

  private readonly router: Router;
  private enigmeService: EnigmeService;
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

  private async getEnigmes(_req: Request, res: Response, _next: NextFunction): Promise<void> {
		const enigmes: Enigme[] = await this.enigmeService.getEnigmes();
    res.status(200).json(enigmes);
  }

  private async getEnigme(_req: Request, res: Response, _next: NextFunction): Promise<void> {
    // TODO validations des paramètres et gestion d'erreurs.
		console.log("Router enigmes");
    const enigme: Enigme = await this.enigmeService.getEnigme(Number.parseInt(_req.params.id?.toString() ?? "0"));
    res.status(200).json(enigme);
  }

  private async creerEnigme(_req: Request, res: Response, _next: NextFunction): Promise<void> {
    const enigmeDTO: EnigmeCreerDTO = _req.body;
		const enigme = await this.enigmeService.addEnigme(enigmeDTO);
    res.status(200).json(enigme);
  }

  public getRouter(): Router {
    return this.router;
  }
}
