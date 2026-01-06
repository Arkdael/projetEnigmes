import EnigmeService from "@/app/services/EnigmeService";
class TentativeService {
    private static instance: TentativeService;
    private tentatives: Array<Tentative>;
    private static readonly TAILLE_MIN_CHAMP = 1;
    private static readonly TAILLE_MAX_CHAMP = 256;
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
        let tentatives = this.tentatives.filter(tentative => tentative.joueurId == joueurId && tentative.enigmeId == enigmeId);
        //let tentatives : Array<Tentative> = JSON.parse(sessionStorage.getItem(`tentatives|${joueurId}|${enigmeId}`)??"");
        return tentatives;
    }

    public effectuerTentative(joueurId : number, enigmeId : number, tentativeTexte : string) {
        if(tentativeTexte.length < TentativeService.TAILLE_MIN_CHAMP || tentativeTexte.length > TentativeService.TAILLE_MAX_CHAMP) {
            alert(`Votre tentative doit être entre ${TentativeService.TAILLE_MIN_CHAMP} et ${TentativeService.TAILLE_MAX_CHAMP} caractères.`);
            return;
        }
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
        //let tentativesJoueur : Array<Tentative> = JSON.parse(sessionStorage.getItem(`tentatives|${joueurId}|${enigmeId}`)??"");
        //tentativesJoueur.push(nouvelleTentative);
        //sessionStorage.setItem(`tentatives|${joueurId}|${enigmeId}`, JSON.stringify(tentativesJoueur));
        return nouvelleTentative;
    }

}

export default TentativeService;
