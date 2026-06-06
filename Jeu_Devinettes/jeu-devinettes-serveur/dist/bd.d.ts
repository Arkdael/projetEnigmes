import { Connection } from 'mariadb';
export default class FournisseurConnexion {
    private static instance;
    private connexion;
    static getInstance(): FournisseurConnexion;
    private initConnexion;
    getConnexion(): Promise<Connection>;
}
//# sourceMappingURL=bd.d.ts.map