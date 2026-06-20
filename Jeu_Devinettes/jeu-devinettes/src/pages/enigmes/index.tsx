import Link from 'next/link';
import Footer from "@/src/app/shared/footer";
import Enigme from "@/src/app/models/Enigme";
import EnigmeService from "@/src/app/services/EnigmeService";
import React, { useEffect, useState } from 'react';
import Header from '@/src/app/shared/header';
import { m } from "@/src/paraglide/messages";

function ListeEnigmes({enigmes}: {enigmes: Enigme[]}) {
  return (
		<table>
			<thead>
				<tr>
					<td>{m.enigme_liste_colId()}</td>
					<td>{m.enigme_liste_colTexte()}</td>
					<td> </td>
				</tr>
			</thead>
			<tbody>
			{
				enigmes.map(enigme =>
				<tr key={enigme.id}>
					<td>{enigme.id}</td>
					<td>{enigme.question}</td>
					<td><Link className="fauxButton" href={"/enigmes/" + enigme.id}>{m.enigme_liste_resoudre()}</Link></td>
				</tr>
				)
			}
			</tbody>
		</table>
  );
}

function FormulaireRecherche({handleSearch}: {handleSearch: (value: string) => void}) {
  const [texteRecherche, setTexteRecherche] = useState("");

  function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		handleSearch(texteRecherche);
  }

  return (
	<form onSubmit={handleSubmit}>
	  <div className="formInput">
			<input 
				placeholder="Rechercher"
				id="texteReponse"
				type="text"
				value={texteRecherche}
				onChange={(e) => setTexteRecherche(e.target.value)}/>
			<button type="submit">
				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor">
					<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
				</svg>
			</button>
	  </div>
	</form>
  );
}

export default function Page() {
  const [enigmes, setEnigmes] = useState<Enigme[]>([]);
  const [listeInitiale, setListeInitiale] = useState<Enigme[]>([]);

  useEffect(() => {
		chargerDonnees();
  }, []);

  async function chargerDonnees() {
		try {
			const enigmeService: EnigmeService = new EnigmeService();
			let liste: Enigme[] = await enigmeService.recupererTout();
			setListeInitiale(liste);
			setEnigmes(liste);
		}
		catch(erreur) {
			console.log(erreur);
		}
  }

  function handleSearch(texte: string) {
		setEnigmes(listeInitiale.filter(enigme => enigme.question.includes(texte)));
  }

  return (
		<div>
			<Header />
			<main>
				<FormulaireRecherche handleSearch={handleSearch} />
				<ListeEnigmes enigmes={enigmes} />
			</main>
			<Footer />
		</div>
  );
}
