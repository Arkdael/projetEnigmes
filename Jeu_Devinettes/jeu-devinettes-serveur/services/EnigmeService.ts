import Enigme from "../models/Enigme";
import EnigmeCreerDTO from "../models/transfert/EnigmeCreer";

class EnigmeService {
    private static instance: EnigmeService;
    private seedEnigmes: Enigme[] = [
        { "id": 1, "question": "Quel être, pourvu d'une seule voix, a d'abord quatre jambes le matin, puis deux jambes à midi, et trois jambes le soir?", "solution": "L'Homme", "explication" : ""},
        { "id": 2, "question": "Mieux que dieu, pire que le diable. Les pauvres en ont, les riches en ont besoin. Si on en mange, on meurt.", "solution": "Rien", "explication" : ""},
        { "id": 3, "question": "Plus j'ai de gardiens moins je suis gardé. Moins j'ai de gardiens plus je suis gardé. Qui suis-je ?", "solution": "Un secret", "explication" : ""},
    ];

    private enigmes: Enigme[];

    private static readonly TAILLE_MIN_CHAMP = 1;
    private static readonly TAILLE_MAX_CHAMP = 256;

    constructor() {
        this.enigmes = [...this.seedEnigmes];
    }
    
    public static getInstance(): EnigmeService {
        if (!EnigmeService.instance) {
            EnigmeService.instance = new EnigmeService();
        }
        return EnigmeService.instance;
    }

    public getEnigmes(): Enigme[] {
        return this.enigmes;
    }

    public getEnigmesFiltres(): Enigme[] {
        return this.enigmes.sort((a, b) => {
            return a.question.toUpperCase() <= b.question.toUpperCase()?-1:1
        });
    }

    public getEnigme(enigmeId: number): Enigme | undefined {
        return this.enigmes.find(enigme => enigme.id == enigmeId);
    }

    public addEnigme(dto: EnigmeCreerDTO): Enigme[] | void {
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

        const nouvelleEnigme: Enigme = {
            id: this.enigmes.length + 1,
            question: dto.texteEnigme,
            solution: dto.texteReponse,
            explication: dto.texteExplication,
        };

        this.enigmes.push(nouvelleEnigme);
        return this.enigmes;
    }
}

export default EnigmeService;
