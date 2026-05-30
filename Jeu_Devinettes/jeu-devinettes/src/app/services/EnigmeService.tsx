import Enigme from "../models/Enigme";
import EnigmeCreerDTO from "../models/transfert/EnigmeCreer";
import HttpService from "./HttpService";

export default class EnigmeService extends HttpService<Enigme> {
	protected override apiUrl: string =  `${this.apiUrl}/enigmes`;
	public static override readonly TAILLE_MAX_CHAMP = 256;

	public override creer(enigmeDTO: EnigmeCreerDTO): Promise<Enigme> {
		return super.creer(enigmeDTO);
	}
}
