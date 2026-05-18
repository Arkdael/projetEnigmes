import Tentative from "../models/Tentative";
import TentativeCreerDTO from "../models/transfert/TentativeCreer";
import HttpService from "./HttpService";

export default class TentativeService extends HttpService<Tentative> {
    protected override apiUrl: string =  `${this.apiUrl}/tentatives`;

    public async getTentatives(joueurId : number, enigmeId : number) {
        const reponse = await fetch(`${this.apiUrl}/${enigmeId}/${joueurId}`);
        return await reponse.json() as Tentative[];
    }

    public async effectuerTentative(joueurId: number, enigmeId: number, tentativeTexte: string) {
        const dto = {joueurId, enigmeId, tentativeTexte} as TentativeCreerDTO;
        const reponse = await fetch(`${this.apiUrl}/effectuer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dto),
        });;
        
        return await reponse.json() as Tentative;
    }
}
