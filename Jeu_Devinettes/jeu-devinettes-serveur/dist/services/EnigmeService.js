"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bd_1 = __importDefault(require("../bd"));
const node_dns_1 = require("node:dns");
class EnigmeService {
    static instance;
    seedEnigmes = [
        { "id": 1, "question": "Quel être, pourvu d'une seule voix, a d'abord quatre jambes le matin, puis deux jambes à midi, et trois jambes le soir?", "solution": "L'Homme", "explication": "" },
        { "id": 2, "question": "Mieux que dieu, pire que le diable. Les pauvres en ont, les riches en ont besoin. Si on en mange, on meurt.", "solution": "Rien", "explication": "" },
        { "id": 3, "question": "Plus j'ai de gardiens moins je suis gardé. Moins j'ai de gardiens plus je suis gardé. Qui suis-je ?", "solution": "Un secret", "explication": "" },
    ];
    enigmes;
    static TAILLE_MIN_CHAMP = 1;
    static TAILLE_MAX_CHAMP = 256;
    connexion;
    constructor() {
        this.enigmes = [...this.seedEnigmes];
        this.connexion = bd_1.default.getInstance().getConnexion();
    }
    static getInstance() {
        if (!EnigmeService.instance) {
            EnigmeService.instance = new EnigmeService();
        }
        return EnigmeService.instance;
    }
    async testConnexion() {
        const books = await (await this.connexion).query('SELECT * FROM books');
        console.log(books);
    }
    async getEnigmes() {
        this.testConnexion();
        return this.enigmes;
    }
    async getEnigmesFiltres() {
        return this.enigmes.sort((a, b) => {
            return a.question.toUpperCase() <= b.question.toUpperCase() ? -1 : 1;
        });
    }
    async getEnigme(enigmeId) {
        const enigme = this.enigmes.find(enigme => enigme.id == enigmeId);
        if (!enigme) {
            throw node_dns_1.NOTFOUND;
        }
        return enigme;
    }
    async addEnigme(dto) {
        // TODO gestion d'erreur.
        if (dto.texteEnigme.length < EnigmeService.TAILLE_MIN_CHAMP || dto.texteEnigme.length > EnigmeService.TAILLE_MAX_CHAMP) {
            return;
        }
        if (dto.texteReponse.length < EnigmeService.TAILLE_MIN_CHAMP || dto.texteReponse.length > EnigmeService.TAILLE_MAX_CHAMP) {
            return;
        }
        if (dto.texteExplication.length < EnigmeService.TAILLE_MIN_CHAMP || dto.texteExplication.length > EnigmeService.TAILLE_MAX_CHAMP) {
            return;
        }
        const nouvelleEnigme = {
            id: this.enigmes.length + 1,
            question: dto.texteEnigme,
            solution: dto.texteReponse,
            explication: dto.texteExplication,
        };
        this.enigmes.push(nouvelleEnigme);
        const reponse = await (await this.connexion).query(`INSERT INTO Enigmes (id, question, solution, explication) VALUES (${nouvelleEnigme.id}, ${nouvelleEnigme.question}, ${nouvelleEnigme.solution}, ${nouvelleEnigme.explication});`);
        console.log(reponse);
        return this.enigmes;
    }
}
exports.default = EnigmeService;
//# sourceMappingURL=EnigmeService.js.map