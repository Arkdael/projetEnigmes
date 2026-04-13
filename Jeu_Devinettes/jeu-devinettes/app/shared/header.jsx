import Link from "next/link";

const header = () => {
  return (
    <header>
      <h1>Projet enigmes</h1>
      <nav>
        <ul className="rangee">
          <li>
            <Link href={"/accueil"}>Accueil</Link>
          </li>
          <li>
            <Link href={"/enigmes"}>Parcourir</Link>
          </li>
          <li>
            <Link href={"/enigmes/creer"}>Créer</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default header;
  