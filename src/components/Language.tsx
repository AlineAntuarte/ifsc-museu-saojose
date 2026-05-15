"use client";

import { useEffect } from "react";
import { color } from "three/src/nodes/TSL.js";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

export default function Translate() {
  useEffect(() => {
    // Only add the script if it doesn't exist yet
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    // Define the callback
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "pt",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };
  }, []);

  const changeLanguage = (lang: string) => {
    const select = document.querySelector(
      ".goog-te-combo"
    ) as HTMLSelectElement | null;

    if (!select) return;

    select.value = lang;
    select.dispatchEvent(new Event("change"));
  };

  return (
    <div>
      <div id="google_translate_element" style={{ display: "none" }} />


    <div>
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("es")}>Español</button>
      <button onClick={() => changeLanguage("pt")}>Português</button>
    </div>

    </div>
  );
}