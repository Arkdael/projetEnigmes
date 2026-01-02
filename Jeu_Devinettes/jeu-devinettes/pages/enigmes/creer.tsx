'use client';
import { useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/router";
import Header from "@/app/shared/header";
import Footer from "@/app/shared/footer";
import EnigmeService from "@/app/services/enigmesService";

const TAILLE_MIN_CHAMP = 1;
const TAILLE_MAX_CHAMP = 32;
let enigmeService : EnigmeService = EnigmeService.getInstance();

function FormulaireCreationEnigme({ gererEnvoi }: { gererEnvoi: (enigme: Enigme) => void }) {
  const [texteEnigme, setTexteEnigme] = useState("");
  const [texteReponse, setTexteReponse] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    enigmeService.addEnigme(texteEnigme, texteReponse);
    setTexteEnigme("");
    setTexteReponse("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="formInput">
        <label htmlFor="texteEnigme">Texte de l'énigme</label>
        <br />
        <input
          id="texteEnigme"
          type="text"
          value={texteEnigme}
          onChange={(e) => setTexteEnigme(e.target.value)}
        />
      </div>
      <div className="formInput">
        <label htmlFor="texteReponse">Texte de la réponse</label>
        <br />
        <input
          id="texteReponse"
          type="text"
          value={texteReponse}
          onChange={(e) => setTexteReponse(e.target.value)}
        />
      </div>
      <button className="formInput" type="submit">Envoyer</button>
    </form>
  );
}

export default function Page() {
  const [enigmes, setEnigmes] = useState<Enigme[]>([]);
  const router = useRouter();

  // Gestion de l'envoi d'une nouvelle énigme
  function gererEnvoi(nouvelleEnigme: Enigme) {
    setEnigmes([nouvelleEnigme, ...enigmes]);
  }

  return (
    <div>
      <Header />
      <main>
        <div className="content">
          <FormulaireCreationEnigme gererEnvoi={gererEnvoi} />
        </div>
      </main>
      <Footer />
    </div>
  );
}