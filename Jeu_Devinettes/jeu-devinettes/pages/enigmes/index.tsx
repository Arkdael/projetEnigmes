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

export default function Page() {
  let enigmeService : EnigmeService = EnigmeService.getInstance();
  const enigmes : Array<Enigme> = enigmeService.getEnigmes();

  return (
    <div>
      <Header />
      <main>
        <ListeEnigmes enigmes={enigmes} />
      </main>
      <Footer />
    </div>
  );
}
