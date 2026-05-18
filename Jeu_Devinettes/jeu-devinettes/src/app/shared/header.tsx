import Link from "next/link";
import LanguageButton from "./language-button";
import { m } from "@/src/paraglide/messages";

export default function Header() {
  return (
    <header>
      <nav>
        <ul className="rangee">
          <li>
            <Link href={"/"}>{m.navigation_pageAccueil()}</Link>
          </li>
          <li>
            <Link href={"/enigmes"}>{m.navigation_pageListeEnigmes()}</Link>
          </li>
          <li>
            <Link href={"/enigmes/creer"}>{m.navigation_pageCreerEnigme()}</Link>
          </li>
          <LanguageButton />
        </ul>
      </nav>
    </header>
  );
};
  
