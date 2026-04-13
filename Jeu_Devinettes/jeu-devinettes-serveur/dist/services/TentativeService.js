"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EnigmeService_1 = __importDefault(require("./EnigmeService"));
class TentativeService {
    static instance;
    tentatives = [];
    static TAILLE_MIN_CHAMP = 1;
    static TAILLE_MAX_CHAMP = 256;
    enigmeService = EnigmeService_1.default.getInstance();
    constructor() { }
    static getInstance() {
        if (!TentativeService.instance) {
            TentativeService.instance = new TentativeService();
        }
        return TentativeService.instance;
    }
    getAllTentatives() {
        return this.tentatives;
    }
    getTentatives(joueurId, enigmeId) {
        const tentatives = this.tentatives.filter(tentative => tentative.joueurId == joueurId && tentative.enigmeId == enigmeId);
        //let tentatives : Array<Tentative> = JSON.parse(sessionStorage.getItem(`tentatives|${joueurId}|${enigmeId}`)??"");
        return tentatives;
    }
    effectuerTentative(dto) {
        if (dto.tentativeTexte.length < TentativeService.TAILLE_MIN_CHAMP || dto.tentativeTexte.length > TentativeService.TAILLE_MAX_CHAMP) {
            //alert(`Votre tentative doit être entre ${TentativeService.TAILLE_MIN_CHAMP} et ${TentativeService.TAILLE_MAX_CHAMP} caractères.`);
            return;
        }
        const enigme = this.enigmeService.getEnigme(dto.enigmeId);
        const resultat = dto.tentativeTexte.toLowerCase() == enigme?.solution.toLowerCase() ? "Correct" : "Incorrect";
        const nouvelleTentative = {
            id: this.tentatives.length + 1,
            joueurId: dto.joueurId,
            enigmeId: dto.enigmeId,
            texte: dto.tentativeTexte,
            resultat: resultat
        };
        this.tentatives.push(nouvelleTentative);
        //let tentativesJoueur : Array<Tentative> = JSON.parse(sessionStorage.getItem(`tentatives|${joueurId}|${enigmeId}`)??"");
        //tentativesJoueur.push(nouvelleTentative);
        //sessionStorage.setItem(`tentatives|${joueurId}|${enigmeId}`, JSON.stringify(tentativesJoueur));
        return nouvelleTentative;
    }
}
exports.default = TentativeService;
//# sourceMappingURL=TentativeService.js.map