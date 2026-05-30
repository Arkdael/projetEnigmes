interface IObjet {
  id: number;
}

export default abstract class HttpService<TObjet extends IObjet> {
  protected readonly apiUrl: string = "http://localhost:4200";
  public static TAILLE_MIN_CHAMP = 1;
  public static TAILLE_MAX_CHAMP = 32;

  constructor() {}

  public async recuperer(id: number): Promise<TObjet>  {
    const reponse = await fetch(`${this.apiUrl}/${id}`);
    return await reponse.json() as TObjet;
  }

  public async recupererTout(): Promise<TObjet[]> {
    const reponse = await fetch(`${this.apiUrl}/`);
    return await reponse.json() as TObjet[];
  }

  public async creer(dto : any): Promise<TObjet> {
    const reponse = await fetch(`${this.apiUrl}/creer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    });
    return await reponse.json() as TObjet;
  }

  public async modifier(): Promise<TObjet> {
    const reponse = await fetch(`${this.apiUrl}/modifier`);
    return await reponse.json() as TObjet;
  }

  public async supprimer(): Promise<any> {
    const reponse = await fetch(`${this.apiUrl}/supprimer`);
    return reponse.json();
  }
}
