import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "@/src/app/shared/header";
import Footer from "@/src/app/shared/footer";
import TentativeService from "@/src/app/services/TentativeService";
import EnigmeService from "@/src/app/services/EnigmeService";
import Tentative from "@/src/app/models/Tentative";
import TentativeCreerDTO from "@/src/app/models/transfert/TentativeCreer";
import Enigme from "@/src/app/models/Enigme";
import { m } from "@/src/paraglide/messages";

const JOUEUR_ID = 1; // TODO remplacer par un système d'authentification fonctionnel.

function FormulaireTentative({ gererTentative }: { gererTentative : (value : string) => void }) {
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
          <td>{tentative.resultat}</td>
        </tr>
        )
      }
      </tbody>
    </table>
  );
}

export default function Page() {
  //const locale = useUrlLocale(baseLocale);
  const router = useRouter();
  const enigmeService: EnigmeService = new EnigmeService();
  const tentativeService: TentativeService = new TentativeService();
  const [enigme, setEnigme] = useState<Enigme>({"id": -1, "question": "id d'énigme introuvable.", "solution": "", "explication": ""} as Enigme);
  const [listeInitiale, setListeInitiale] = useState<Tentative[]>([]);
  const [tentatives, setTentatives] = useState<Tentative[]>(listeInitiale);

  useEffect(() => {
    chargerDonnees();
  }, []);

  async function chargerDonnees() {
    try {
      const enigme: Enigme = await enigmeService.recuperer(Number(router.query.id));
      setEnigme(enigme);

      const liste: Tentative[] = await tentativeService.getTentatives(JOUEUR_ID, enigme.id);
      setListeInitiale(liste);
      setTentatives(liste);
    }
    catch(erreur) {
      console.log(erreur);
    }
  }

  async function gererTentative(texte: string) {
    if(texte.length < TentativeService.TAILLE_MIN_CHAMP || texte.length > TentativeService.TAILLE_MAX_CHAMP) {
      alert(`Votre tentative doit être entre ${TentativeService.TAILLE_MIN_CHAMP} et ${TentativeService.TAILLE_MAX_CHAMP} caractères.`);
      return;
    }

    const nouvelleTentative = await tentativeService.effectuerTentative(JOUEUR_ID, enigme.id, texte);
    if(!nouvelleTentative) {
      return;
    }
    setTentatives([nouvelleTentative, ...tentatives]);
    if(nouvelleTentative.resultat == "Correct") {
      alert(`Félicitation! Vous avez résolu l'énigme en ${tentatives.length} tentatives.`);
    }
  }
  
  return (
    <div>
      <Header/>
      <main>
        <p>«{enigme.question ?? ""}»</p>
        <FormulaireTentative gererTentative={gererTentative}/>
        <ListeTentatives tentatives={tentatives}/>
      </main>
      <Footer />
    </div>
  );
}
