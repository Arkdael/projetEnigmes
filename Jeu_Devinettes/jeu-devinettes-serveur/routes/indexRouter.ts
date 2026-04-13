import { Router, Request, Response, NextFunction } from 'express';

export default class IndexRouter {

  private readonly router: Router;

  constructor() {
    this.router = Router();
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get('/', this.getIndex.bind(this));
    // ajouter d'autres routes ici, par exemple:
    // this.router.post('/submit', this.postSubmit.bind(this));
  }

  private getIndex(_req: Request, res: Response, _next: NextFunction): void {
    res.send('index — Express (class)');
  }

  public getRouter(): Router {
    return this.router;
  }
}
