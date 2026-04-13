import Enigme from "../models/Enigme";
import EnigmeCreerDTO from "../models/transfert/EnigmeCreer";
declare class EnigmeService {
    private static instance;
    private seedEnigmes;
    private enigmes;
    private static readonly TAILLE_MIN_CHAMP;
    private static readonly TAILLE_MAX_CHAMP;
    constructor();
    static getInstance(): EnigmeService;
    getEnigmes(): Enigme[];
    getEnigmesFiltres(): Enigme[];
    getEnigme(enigmeId: number): Enigme | undefined;
    addEnigme(dto: EnigmeCreerDTO): Enigme[] | void;
}
export default EnigmeService;
//# sourceMappingURL=EnigmeService.d.ts.map