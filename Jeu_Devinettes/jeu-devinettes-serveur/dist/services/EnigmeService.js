"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    constructor() {
        this.enigmes = [...this.seedEnigmes];
    }
    static getInstance() {
        if (!EnigmeService.instance) {
            EnigmeService.instance = new EnigmeService();
        }
        return EnigmeService.instance;
    }
    getEnigmes() {
        return this.enigmes;
    }
    getEnigmesFiltres() {
        return this.enigmes.sort((a, b) => {
            return a.question.toUpperCase() <= b.question.toUpperCase() ? -1 : 1;
        });
    }
    getEnigme(enigmeId) {
        return this.enigmes.find(enigme => enigme.id == enigmeId);
    }
    addEnigme(dto) {
        if (dto.texteEnigme.length < EnigmeService.TAILLE_MIN_CHAMP || dto.texteEnigme.length > EnigmeService.TAILLE_MAX_CHAMP) {
            //alert(`Le texte de l'énigme doit être entre ${EnigmeService.TAILLE_MIN_CHAMP} et ${EnigmeService.TAILLE_MAX_CHAMP} caractères.`);
            return;
        }
        if (dto.texteReponse.length < EnigmeService.TAILLE_MIN_CHAMP || dto.texteReponse.length > EnigmeService.TAILLE_MAX_CHAMP) {
            //alert(`La réponse de l'énigme doit être entre ${EnigmeService.TAILLE_MIN_CHAMP} et ${EnigmeService.TAILLE_MAX_CHAMP} caractères.`);
            return;
        }
        if (dto.texteExplication.length < EnigmeService.TAILLE_MIN_CHAMP || dto.texteExplication.length > EnigmeService.TAILLE_MAX_CHAMP) {
            //alert(`L'explication de l'énigme doit être entre ${EnigmeService.TAILLE_MIN_CHAMP} et ${EnigmeService.TAILLE_MAX_CHAMP} caractères.`);
            return;
        }
        const nouvelleEnigme = {
            id: this.enigmes.length + 1,
            question: dto.texteEnigme,
            solution: dto.texteReponse,
            explication: dto.texteExplication,
        };
        this.enigmes.push(nouvelleEnigme);
        return this.enigmes;
    }
}
exports.default = EnigmeService;
//# sourceMappingURL=EnigmeService.js.map