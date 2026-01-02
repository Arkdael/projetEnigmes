class EnigmeService {
    private static instance: EnigmeService;
    private seedEnigmes: Array<Enigme> = [
        { "id": 1, "texte": "Quel être, pourvu d'une seule voix, a d'abord quatre jambes le matin, puis deux jambes à midi, et trois jambes le soir?", "reponse": "L'Homme" },
        { "id": 2, "texte": "Mieux que dieu, pire que le diable. Les pauvres en ont, les riches en ont besoin. Si on en mange, on meurt.", "reponse": "Rien" },
    ];

    private enigmes: Array<Enigme>;

    private static readonly TAILLE_MIN_CHAMP = 1;
    private static readonly TAILLE_MAX_CHAMP = 32;

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

    public getEnigme(index: number): Enigme | undefined {
        return this.enigmes[index];
    }

    public addEnigme(texteEnigme: string, texteReponse: string): Array<Enigme> | void {
        if (texteEnigme.length < EnigmeService.TAILLE_MIN_CHAMP || texteEnigme.length > EnigmeService.TAILLE_MAX_CHAMP) {
            alert(`Le texte de l'énigme doit être entre ${EnigmeService.TAILLE_MIN_CHAMP} et ${EnigmeService.TAILLE_MAX_CHAMP} caractères.`);
            return;
        }
        if (texteReponse.length < EnigmeService.TAILLE_MIN_CHAMP || texteReponse.length > EnigmeService.TAILLE_MAX_CHAMP) {
            alert(`La réponse de l'énigme doit être entre ${EnigmeService.TAILLE_MIN_CHAMP} et ${EnigmeService.TAILLE_MAX_CHAMP} caractères.`);
            return;
        }

        const nouvelleEnigme: Enigme = {
            id: this.enigmes.length + 1,
            texte: texteEnigme,
            reponse: texteReponse,
        };

        this.enigmes.push(nouvelleEnigme);
        return this.enigmes;
    }
}

export default EnigmeService;