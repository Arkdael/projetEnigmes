"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mariadb_1 = require("mariadb");
dotenv_1.default.config();
class FournisseurConnexion {
    static instance;
    connexion = undefined;
    static getInstance() {
        if (!FournisseurConnexion.instance) {
            FournisseurConnexion.instance = new FournisseurConnexion();
        }
        return FournisseurConnexion.instance;
    }
    async initConnexion() {
        try {
            this.connexion = await (0, mariadb_1.createConnection)({
                host: process.env.BD_HOTE,
                user: process.env.BD_UTILISATEUR,
                password: process.env.BD_MDP,
                database: process.env.BD_NOM
            });
        }
        catch (erreur) {
            console.log(`Échec lors de la connexion avec la base de données.\n
			Code: ${erreur.code}\n
			Message: ${erreur.sqlMessage}`);
        }
    }
    async getConnexion() {
        if (!this.connexion) {
            await this.initConnexion();
        }
        return this.connexion;
    }
}
exports.default = FournisseurConnexion;
//# sourceMappingURL=bd.js.map