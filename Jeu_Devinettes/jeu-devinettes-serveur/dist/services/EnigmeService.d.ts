import Enigme from "../models/Enigme";
import EnigmeCreerDTO from "../models/transfert/EnigmeCreer";
declare class EnigmeService {
    private static instance;
    private seedEnigmes;
    private enigmes;
    private static readonly TAILLE_MIN_CHAMP;
    private static readonly TAILLE_MAX_CHAMP;
    private connexion;
    constructor();
    static getInstance(): EnigmeService;
    testConnexion(): Promise<void>;
    getEnigmes(): Promise<Enigme[]>;
    getEnigmesFiltres(): Promise<Enigme[]>;
    getEnigme(enigmeId: number): Promise<Enigme>;
    addEnigme(dto: EnigmeCreerDTO): Promise<Enigme[] | void>;
}
export default EnigmeService;
//# sourceMappingURL=EnigmeService.d.ts.map