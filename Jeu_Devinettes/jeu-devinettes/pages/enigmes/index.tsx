'use client';
import { ChangeEventHandler, Dispatch, FormEventHandler, SetStateAction, useState } from "react";
import Link from 'next/link';
import Header from '../../app/shared/header';
import Footer from "@/app/shared/footer";
import EnigmeService from "@/app/services/EnigmeService";

function ListeEnigmes({enigmes} : {enigmes: Array<Enigme>}) {
  return (
  <table>
    <thead>
      <tr>
        <td>Id</td>
        <td>Enigme</td>
        <td> </td> 
      </tr>
    </thead>
    <tbody>
    {
      enigmes.map(enigme =>
        <tr key={enigme.id}>
          <td>{enigme.id}</td>
          <td>{enigme.question}</td>
          <td><Link className="fauxButton" href={"/enigmes/" + enigme.id}>Résoudre</Link></td>
        </tr>
      )
    }
    </tbody>
  </table>
  );
}


function FormulaireRecherche({handleSearch} : {handleSearch :(value : string) => void}) {
  const [texteRecherche, setTexteRecherche] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
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
  const enigmeService : EnigmeService = EnigmeService.getInstance();
  const [enigmes, setEnigme] = useState<Enigme[]>(enigmeService.getEnigmes());
  function handleSearch(texte : string) {
    setEnigme(enigmeService.getEnigmes().filter(enigme => enigme.question.includes(texte)));
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
