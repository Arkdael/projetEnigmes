'use client';
import { ChangeEventHandler, Dispatch, FormEventHandler, SetStateAction, useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/router";
import Header from "@/app/shared/header";
import Footer from "@/app/shared/footer";
import EnigmeService from "@/app/services/EnigmeService";
import TentativeService from "@/app/services/TentativeService";
const TAILLE_MIN_CHAMP = 1;
const TAILLE_MAX_CHAMP = 32;
const JOUEUR_ID = 1;
let tentativeService : TentativeService = TentativeService.getInstance();
let enigmeService : EnigmeService = EnigmeService.getInstance();
function FormulaireTentative({gererTentative} : {gererTentative : (value : string) => void}) {
  const [mot, setMot] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if(mot.length < TAILLE_MIN_CHAMP || mot.length > TAILLE_MAX_CHAMP) {
      return;
    }

    gererTentative(mot);
    setMot("");
  }

  function handleChange(value: string) {
    setMot(value);
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="formInput">
        <label htmlFor="mot">Essayer un mot</label>
        <br/>
        <input
          id="mot"
          type="text"
          value={mot}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      <button className="formInput" type="submit">Envoyer</button>
    </form>
  );
}

function ListeTentatives({tentatives} : {tentatives: Array<Tentative>}) {
  return (
    <table>
      <caption>Tentatives precedentes</caption>
      <thead>
        <tr>
          <td>Id</td>
          <td>Mot</td>
          <td>Resultat</td>
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
  const router = useRouter();
  const ENIGME = enigmeService.getEnigme(Number(router.query.id))??{"id" : -1, "question" : "id d'énigme introuvable.", "solution" : "", "explication" : ""};
  //let tentatives = tentativeService.getTentatives(JOUEUR_ID, ENIGME.id);
  const [tentatives, setTentatives] = useState(Array<Tentative>);

  function gererTentative(texte : string) {
    setTentatives([tentativeService.effectuerTentative(JOUEUR_ID, ENIGME.id, texte), ...tentatives]);
  }
  
  return (
    <div>
      <Header />
      <main>
        <p>«{ENIGME.question??""}»</p>
        <FormulaireTentative gererTentative={gererTentative}/>
        <ListeTentatives tentatives={tentatives}/>
      </main>
      <Footer />
    </div>
  );
}
