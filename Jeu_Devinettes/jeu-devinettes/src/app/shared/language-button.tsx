"use client";
import { baseLocale, getLocale, setLocale } from "@/src/paraglide/runtime";
import { m } from "../../paraglide/messages";

export default function LanguageButton() {
  function getNextLocale() {
    switch (getLocale()) {
      case "en":
        return "fr";
      case "fr":
        return "de";
      case "de":
        return "en";
      default:
        return baseLocale;
    }
  }

  function handleClick() {
    setLocale(getNextLocale());
  }

  return (
    <div>
      <button type="button" onClick={handleClick}>
        {m.langues_changer()}
      </button>
    </div>
  );
}
