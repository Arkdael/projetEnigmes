import EnigmeService from "@/app/services/EnigmeService";
class TentativeService {
    private static instance: TentativeService;
    private tentatives: Array<Tentative>;
    private static readonly TAILLE_MIN_CHAMP = 1;
    private static readonly TAILLE_MAX_CHAMP = 32;
    private enigmeService : EnigmeService = EnigmeService.getInstance();

    constructor() {
        this.tentatives = new Array<Tentative>;
    }
    public static getInstance(): TentativeService {
        if (!TentativeService.instance) {
            TentativeService.instance = new TentativeService();
        }
        return TentativeService.instance;
    }
    public getAllTentatives() {
        return this.tentatives;
    }
    
    public getTentatives(joueurId : number, enigmeId : number) {
        let tentatives = new Array<Tentative>;
        return tentatives;
    }

    public effectuerTentative(joueurId : number, enigmeId : number, tentativeTexte : string) {
        let enigme = this.enigmeService.getEnigme(enigmeId);
        let resultat = tentativeTexte.toLowerCase() == enigme?.solution.toLowerCase()?"Correct":"Incorrect";

        const nouvelleTentative: Tentative = {
            id: this.tentatives.length+1,
            joueurId : joueurId,
            enigmeId : enigmeId, 
            texte : tentativeTexte,
            resultat : resultat
        };
        this.tentatives.push(nouvelleTentative);
        return nouvelleTentative;
    }

}

export default TentativeService;
