import type Tentative from "../models/Tentative";
import TentativeCreerDTO from "../models/transfert/TentativeCreer";
declare class TentativeService {
    private static instance;
    private tentatives;
    private static readonly TAILLE_MIN_CHAMP;
    private static readonly TAILLE_MAX_CHAMP;
    private enigmeService;
    constructor();
    static getInstance(): TentativeService;
    getAllTentatives(): Tentative[];
    getTentatives(joueurId: number, enigmeId: number): Tentative[];
    effectuerTentative(dto: TentativeCreerDTO): Tentative | undefined;
}
export default TentativeService;
//# sourceMappingURL=TentativeService.d.ts.map