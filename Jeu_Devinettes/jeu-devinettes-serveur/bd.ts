import dotenv from 'dotenv';
import { createConnection, Connection } from 'mariadb';
dotenv.config();

export default class FournisseurConnexion {
	private static instance: FournisseurConnexion;
	private connexion: Connection|undefined = undefined;

	public static getInstance(): FournisseurConnexion {
		if(!FournisseurConnexion.instance) {
			FournisseurConnexion.instance = new FournisseurConnexion();
		}
		return FournisseurConnexion.instance;
	}

	private async initConnexion(): Promise<void> {
		try {
			this.connexion = await createConnection({
				host: process.env.BD_HOTE!,
				user: process.env.BD_UTILISATEUR!,
				password: process.env.BD_MDP!,
				database: process.env.BD_NOM!
			});
		}
		catch(erreur: any) {
			console.log(`Échec lors de la connexion avec la base de données.\n
			Code: ${erreur.code}\n
			Message: ${erreur.sqlMessage}`);
		}
	}

	public async getConnexion(): Promise<Connection> {
		if(!this.connexion) {
			await this.initConnexion();
		}
		return this.connexion!;
	}
}
