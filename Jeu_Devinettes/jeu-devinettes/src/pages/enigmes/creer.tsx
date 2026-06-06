import { useState } from "react";
import Header from "@/src/app/shared/header";
import Footer from "@/src/app/shared/footer";
import EnigmeService from "@/src/app/services/EnigmeService";
import EnigmeCreerDTO from "@/src/app/models/transfert/EnigmeCreer";
import { m } from "@/src/paraglide/messages";

const enigmeService: EnigmeService = new EnigmeService();

function FormulaireCreationEnigme() {
  const [texteEnigme, setTexteEnigme] = useState("");
  const [texteReponse, setTexteReponse] = useState("");
  const [texteExplication, setTexteExplication] = useState("");
  
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if(texteEnigme.length < EnigmeService.TAILLE_MIN_CHAMP || texteEnigme.length > EnigmeService.TAILLE_MAX_CHAMP) {
      alert(m.erreur_taille({valeur: m.enigme_creer_champQuestion, min: EnigmeService.TAILLE_MIN_CHAMP, max: EnigmeService.TAILLE_MAX_CHAMP}));
      return;
    }
    if(texteReponse.length < EnigmeService.TAILLE_MIN_CHAMP || texteReponse.length > EnigmeService.TAILLE_MAX_CHAMP) {
      alert(m.erreur_taille({valeur: m.enigme_creer_champReponse, min: EnigmeService.TAILLE_MIN_CHAMP, max: EnigmeService.TAILLE_MAX_CHAMP}));
      return;
    }
    if(texteExplication.length < EnigmeService.TAILLE_MIN_CHAMP || texteExplication.length > EnigmeService.TAILLE_MAX_CHAMP) {
      alert(m.erreur_taille({valeur: m.enigme_creer_champExplication, min: EnigmeService.TAILLE_MIN_CHAMP, max: EnigmeService.TAILLE_MAX_CHAMP}));
      return;
    }

    const reponse = enigmeService.creer({texteEnigme, texteReponse, texteExplication} as EnigmeCreerDTO);
    if(reponse != null) {
      alert(m.forms_messages_creation_succes({objet: m.enigme_nom, genre: "feminin"}));
    }
    setTexteEnigme("");
    setTexteReponse("");
    setTexteExplication("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="formInput">
        <label htmlFor="texteEnigme">{m.enigme_creer_champQuestion()}</label>
        <br/>  
        <input
          id="texteEnigme"
          type="text"
          value={texteEnigme}
          onChange={(e) => setTexteEnigme(e.target.value)}
        />
      </div>
      <div className="formInput">
        <label htmlFor="texteReponse">{m.enigme_creer_champReponse()}</label>
        <br/>
        <input
          id="texteReponse"
          type="text"
          value={texteReponse}
          onChange={(e) => setTexteReponse(e.target.value)}
        />
      </div>
      <div className="formInput">
        <label htmlFor="texteExplication">{m.enigme_creer_champExplication()}</label>
        <br/>
        <textarea
          id="texteExplication"
          value={texteExplication}
          onChange={(e) => setTexteExplication(e.target.value)}
        />
      </div>
      <button className="formInput" type="submit">{m.forms_actions_envoyer()}</button>
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
