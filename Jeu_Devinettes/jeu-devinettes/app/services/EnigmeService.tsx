class EnigmeService {
    private static instance: EnigmeService;
    private seedEnigmes: Array<Enigme> = [
        { "id": 1, "question": "Quel être, pourvu d'une seule voix, a d'abord quatre jambes le matin, puis deux jambes à midi, et trois jambes le soir?", "solution": "L'Homme", "explication" : ""},
        { "id": 2, "question": "Mieux que dieu, pire que le diable. Les pauvres en ont, les riches en ont besoin. Si on en mange, on meurt.", "solution": "Rien", "explication" : ""},
        { "id": 3, "question": "Plus j'ai de gardiens moins je suis gardé. Moins j'ai de gardiens plus je suis gardé. Qui suis-je ?", "solution": "Un secret", "explication" : ""},
    ];

    private enigmes: Array<Enigme>;

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

    public getEnigmes(): Array<Enigme> {
        return this.enigmes;
    }

    public getEnigmesFiltres(): Array<Enigme> {
        return this.enigmes.sort((a, b) => {
            return a.question.toUpperCase() <= b.question.toUpperCase()?-1:1
        });
    }
    public getEnigme(enigmeId: number): Enigme | undefined {
        return this.enigmes.find(enigme => enigme.id == enigmeId);
    }

    public addEnigme(texteEnigme: string, texteReponse: string, texteExplication : string): Array<Enigme> | void {
        if (texteEnigme.length < EnigmeService.TAILLE_MIN_CHAMP || texteEnigme.length > EnigmeService.TAILLE_MAX_CHAMP) {
            alert(`Le texte de l'énigme doit être entre ${EnigmeService.TAILLE_MIN_CHAMP} et ${EnigmeService.TAILLE_MAX_CHAMP} caractères.`);
            return;
        }
        if (texteReponse.length < EnigmeService.TAILLE_MIN_CHAMP || texteReponse.length > EnigmeService.TAILLE_MAX_CHAMP) {
            alert(`La réponse de l'énigme doit être entre ${EnigmeService.TAILLE_MIN_CHAMP} et ${EnigmeService.TAILLE_MAX_CHAMP} caractères.`);
            return;
        }
        if (texteExplication.length < EnigmeService.TAILLE_MIN_CHAMP || texteExplication.length > EnigmeService.TAILLE_MAX_CHAMP) {
            alert(`L'explication de l'énigme doit être entre ${EnigmeService.TAILLE_MIN_CHAMP} et ${EnigmeService.TAILLE_MAX_CHAMP} caractères.`);
            return;
        }
        const nouvelleEnigme: Enigme = {
            id: this.enigmes.length + 1,
            question: texteEnigme,
            solution: texteReponse,
            explication : texteExplication,
        };

        this.enigmes.push(nouvelleEnigme);
        return this.enigmes;
    }
}

export default EnigmeService;
