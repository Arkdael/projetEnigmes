import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "@/src/app/shared/header";
import Footer from "@/src/app/shared/footer";
import TentativeService from "@/src/app/services/TentativeService";
import EnigmeService from "@/src/app/services/EnigmeService";
import Tentative, { Resultat, traduireResultat } from "@/src/app/models/Tentative";
import Enigme from "@/src/app/models/Enigme";
import { m } from "@/src/paraglide/messages";
import IntrouvableErreur from "@/src/app/models/errorModels/IntrouvableErreur";
import TentativeCreerDTO from "@/src/app/models/transfert/TentativeCreer";
import TailleErreur from "@/src/app/models/errorModels/TailleErreur";

const JOUEUR_ID = 1; // TODO remplacer par un système d'authentification fonctionnel.

function FormulaireTentative({gererTentative}: {gererTentative: (value: string) => void}) {
	const [mot, setMot] = useState("");

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		gererTentative(mot);
		setMot("");
	}

	function handleChange(value: string) {
		setMot(value);
	}
	
	function abandonner() {
		alert(":("); // TODO Trouver comment avoir la reponse de l'énigme.
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className="formInput">
				<label htmlFor="mot">{m.enigme_jeu_essayer()}</label>
				<br/>
				<input
					id="mot"
					type="text"
					value={mot}
					onChange={(e) => handleChange(e.target.value)}
				/>
			</div>
			<button className="formInput" type="submit">{m.forms_actions_envoyer()}</button>
			<button className="formInput boutonAbandonner" type="button" onClick={abandonner}>{m.enigme_jeu_abandonner()}</button>
		</form>
	);
}

function ListeTentatives({tentatives}: {tentatives: Tentative[]}) {
	return (
		<table>
			<caption>{m.enigme_jeu_titre()}</caption>
			<thead>
				<tr>
					<td>{m.enigme_jeu_colId()}</td>
					<td>{m.enigme_jeu_colMot()}</td>
					<td>{m.enigme_jeu_colResultat()}</td>
				</tr>
			</thead>
			<tbody>
			{
				tentatives.map(tentative =>
				<tr key={tentative.id}>
					<td>{tentative.id}</td>
					<td>{tentative.texte}</td>
					<td>{m[traduireResultat(tentative.resultat)]()}</td>
				</tr>
				)
			}
			</tbody>
		</table>
	);
}

export default function Page() {
	const router = useRouter();
	const enigmeService: EnigmeService = new EnigmeService();
	const tentativeService: TentativeService = new TentativeService();

	const [enigme, setEnigme] = useState<Enigme>({} as Enigme);
	const [listeInitiale, setListeInitiale] = useState<Tentative[]>([]);
	const [tentatives, setTentatives] = useState<Tentative[]>(listeInitiale);

	useEffect(() => {
		if(router.isReady) {
			chargerDonnees();
		}
	}, [router.isReady, router.query.id]);

	async function chargerDonnees() {
		try {
			const enigme: Enigme = await enigmeService.recuperer(Number(router.query.id));
			setEnigme(enigme);

			const liste: Tentative[] = await tentativeService.getTentatives(JOUEUR_ID, enigme.id);
			setListeInitiale(liste);
			setTentatives(liste);
		}
		catch(erreur) {
			switch(true) {
				case erreur instanceof IntrouvableErreur: {
					console.log(erreur);
					router.replace("/erreurs/introuvable");
					break;
				}
				default: {
					console.log(erreur);
					break;
				}
			}
		}
	}

	async function gererTentative(texte: string) {
		try {
			const tentativeDTO = new TentativeCreerDTO(JOUEUR_ID, enigme.id, texte);

			const nouvelleTentative = await tentativeService.effectuerTentative(tentativeDTO);

			setTentatives([...tentatives, nouvelleTentative]);
			if(nouvelleTentative.resultat == Resultat.CORRECT) {
				alert(m.enigme_jeu_messages_felicitation({compte: tentatives.length}));
			}
		}
		catch(erreur) {
			switch(true) {
				case erreur instanceof TailleErreur: {
					alert(m.erreur_taille({valeur: (m[erreur.champ as keyof typeof m] as any)() ?? erreur.champ, min: erreur.tailleMin, max: erreur.tailleMax}));
					break;
				}
				default: {
					console.log(erreur);
					break;
				}
			}
		}
	}
	
	return (
		<div>
			<Header/>
			<main>
				<p>«{enigme.question}»</p>
				<FormulaireTentative gererTentative={gererTentative}/>
				<ListeTentatives tentatives={tentatives}/>
			</main>
			<Footer />
		</div>
	);
}
