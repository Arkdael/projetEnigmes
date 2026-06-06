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
    getAllTentatives(): Promise<Tentative[]>;
    getTentatives(joueurId: number, enigmeId: number): Promise<Tentative[]>;
    effectuerTentative(dto: TentativeCreerDTO): Promise<Tentative | undefined>;
}
export default TentativeService;
//# sourceMappingURL=TentativeService.d.ts.map