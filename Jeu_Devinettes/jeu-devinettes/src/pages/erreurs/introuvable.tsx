import Header from "@/src/app/shared/header";
import Footer from "@/src/app/shared/footer";
import { m } from "@/src/paraglide/messages";

export default function Page() {
	
	return (
		<div>
			<Header/>
			<main>
				<h1>{m.erreur_introuvable_titre()}</h1>
        <p>{m.erreur_introuvable_generique()}</p>
			</main>
			<Footer/>
		</div>
	);
}
