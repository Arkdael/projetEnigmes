'use client';
import { ChangeEventHandler, Dispatch, FormEventHandler, SetStateAction, useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/router";
import Header from "@/app/shared/header";
import Footer from "@/app/shared/footer";
import EnigmeService from "@/app/services/enigmesService";
const TAILLE_MIN_CHAMP = 1;
const TAILLE_MAX_CHAMP = 32;

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
        <tr key={tentative.mot}>
          <td>{tentative.id}</td>
          <td>{tentative.mot}</td>
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
  let enigmeService : EnigmeService = EnigmeService.getInstance();
  const enigmes = enigmeService.getEnigmes();
  const ENIGME = enigmes.find(enigme => enigme.id == Number(router.query.id))??{"id" : -1, "texte" : "id d'énigme introuvable.", "reponse" : "" };


  const [tentatives, setTentatives] = useState(Array<Tentative>);

  function gererTentative(texte : string) {
    let nouvelle_tentative = {"id": tentatives.length+1, "mot": texte, "resultat": texte == ENIGME.reponse?"Correct":"Incorrect"};
    setTentatives([nouvelle_tentative, ...tentatives]);
  }
  
  return (
    <div>
      <Header />
      <main>
      <div className="content">
        <div className="rangee">
          <p>«{ENIGME.texte??""}»</p>
        </div>
        <FormulaireTentative gererTentative={gererTentative} />
          <ListeTentatives tentatives={tentatives}/>
      </div>
      </main>
      <Footer />
    </div>
  );
}
