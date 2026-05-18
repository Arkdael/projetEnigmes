import Header from "./shared/header";
import Footer from "./shared/footer";
import { m } from "../paraglide/messages";

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <div className="content">
          <h1>{m.projet_titre()}</h1>
          <p>{m.projet_description()}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
