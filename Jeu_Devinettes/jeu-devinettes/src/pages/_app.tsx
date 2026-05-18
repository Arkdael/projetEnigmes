import "../app/styles/globals.css";
import { AppProps } from "next/app";
import { assertIsLocale, baseLocale } from "../paraglide/runtime";
import { ParaglideProvider } from "../app/shared/paraglideProvider";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ParaglideProvider locale={assertIsLocale(router.locale) ?? baseLocale}>
      <Component {...pageProps} />
    </ParaglideProvider>
  );
}
