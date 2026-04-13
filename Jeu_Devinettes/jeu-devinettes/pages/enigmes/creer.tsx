import { useState } from "react";
import Header from "@/app/shared/header";
import Footer from "@/app/shared/footer";
import EnigmeService from "@/app/services/EnigmeService";
import EnigmeCreerDTO from "@/app/models/transfert/EnigmeCreer";

const enigmeService : EnigmeService = new EnigmeService();

function FormulaireCreationEnigme() {
  const [texteEnigme, setTexteEnigme] = useState("");
  const [texteReponse, setTexteReponse] = useState("");
  const [texteExplication, setTexteExplication] = useState("");
  
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (texteEnigme.length < EnigmeService.TAILLE_MIN_CHAMP || texteEnigme.length > EnigmeService.TAILLE_MAX_CHAMP) {
      alert(`Le texte de l'énigme doit être entre ${EnigmeService.TAILLE_MIN_CHAMP} et ${EnigmeService.TAILLE_MAX_CHAMP} caractères.`);
      return;
    }
    if (texteReponse.length < EnigmeService.TAILLE_MIN_CHAMP || texteReponse.length > EnigmeService.TAILLE_MAX_CHAMP) {
      alert(`La réponse de l'énigme doit être entre ${EnigmeService.TAILLE_MIN_CHAMP} et ${EnigmeService.TAILLE_MAX_CHAMP} caractères.`);
      return;
    }
    if (texteExplication.length < EnigmeService.TAILLE_MIN_CHAMP || texteExplication.length > EnigmeService.TAILLE_MAX_CHAMP) {
      alert(`L'explication de l'énigme doit être entre ${EnigmeService.TAILLE_MIN_CHAMP} et ${EnigmeService.TAILLE_MAX_CHAMP} caractères.`);
      return;
    }

    const reponse = enigmeService.creer({texteEnigme, texteReponse, texteExplication} as EnigmeCreerDTO);
    if(reponse != null) {
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
