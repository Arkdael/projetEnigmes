'use client';
import { useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/router";
import Header from "@/app/shared/header";
import Footer from "@/app/shared/footer";
import EnigmeService from "@/app/services/EnigmeService";

const TAILLE_MIN_CHAMP = 1;
const TAILLE_MAX_CHAMP = 32;
let enigmeService : EnigmeService = EnigmeService.getInstance();

function FormulaireCreationEnigme() {
  const [texteEnigme, setTexteEnigme] = useState("");
  const [texteReponse, setTexteReponse] = useState("");
  const [texteExplication, setTexteExplication] = useState("");
  
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let response = enigmeService.addEnigme(texteEnigme, texteReponse, texteExplication);
    if(response != null) {
          alert("Énigme créé avec succès!");
    }
    setTexteEnigme("");
    setTexteReponse("");
    setTexteExplication("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="formInput">
        <label htmlFor="texteEnigme">Texte de l'énigme</label>
        <br/>  
        <input
          id="texteEnigme"
          type="text"
          value={texteEnigme}
          onChange={(e) => setTexteEnigme(e.target.value)}
        />
      </div>
      <div className="formInput">
        <label htmlFor="texteReponse">Texte de la réponse</label>
        <br/>
        <input
          id="texteReponse"
          type="text"
          value={texteReponse}
          onChange={(e) => setTexteReponse(e.target.value)}
        />
      </div>
      <div className="formInput">
        <label htmlFor="texteExplication">Texte de l'explication</label>
        <br/>
        <textarea
          id="texteExplication"
          value={texteExplication}
          onChange={(e) => setTexteExplication(e.target.value)}
        />
      </div>
      <button className="formInput" type="submit">Envoyer</button>
    </form>
  );
}

export default function Page() {
  return (
    <div>
      <Header />
      <main>
        <FormulaireCreationEnigme />
      </main>
      <Footer />
    </div>
  );
}
