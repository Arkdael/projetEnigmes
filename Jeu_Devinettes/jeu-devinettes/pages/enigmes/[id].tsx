'use client';
import { ChangeEventHandler, Dispatch, FormEventHandler, SetStateAction, useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/router";
import Header from "@/app/shared/header";
import Footer from "@/app/shared/footer";
import EnigmeService from "@/app/services/EnigmeService";
import TentativeService from "@/app/services/TentativeService";
import { exit } from "process";
const TAILLE_MIN_CHAMP = 1;
const TAILLE_MAX_CHAMP = 32;
const JOUEUR_ID = 1;
let tentativeService : TentativeService = TentativeService.getInstance();
let enigmeService : EnigmeService = EnigmeService.getInstance();
function FormulaireTentative({gererTentative} : {gererTentative : (value : string) => void}) {
  const [mot, setMot] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    gererTentative(mot);
    setMot("");
  }

  function handleChange(value: string) {
    setMot(value);
  }
  
  function abandonner() {
    alert(":("); //Trouver comment avoir la reponse de l'énigme.
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
      <button className="formInput boutonAbandonner" type="button" onClick={abandonner}>Abandonner</button>
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
  const enigme = enigmeService.getEnigme(Number(router.query.id))??{"id" : -1, "question" : "id d'énigme introuvable.", "solution" : "", "explication" : ""};
  const [tentatives, setTentatives] = useState<Array<Tentative>>(tentativeService.getTentatives(JOUEUR_ID, enigme.id));  
  function gererTentative(texte : string) {
    let nouvelleTentative = tentativeService.effectuerTentative(JOUEUR_ID, enigme.id, texte);
    if(!nouvelleTentative) {
      return;
    }
    setTentatives([nouvelleTentative, ...tentatives]);
    if(nouvelleTentative.resultat == "Correct") {
      alert("Félicitation! Vous avez résolu l'énigme en " + (tentatives.length  ) + " tentatives.") // Se fait avant l'update de tentatives.
    }
  }
  
  return (
    <div>
      <Header />
      <main>
        <p>«{enigme.question??""}»</p>
        <FormulaireTentative gererTentative={gererTentative}/>
        <ListeTentatives tentatives={tentatives}/>
      </main>
      <Footer />
    </div>
  );
}
