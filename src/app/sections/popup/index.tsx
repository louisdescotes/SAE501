import { useState, useEffect } from "react";
import "./style.scss";
import { useLenis } from "lenis/react";

export default function HorribleCookieConsent() {
  const nonsenseOptions = [
    "Autoriser les cookies à ressentir des émotions",
    "Activer la synchronisation quantique des miettes numériques",
    "Permettre aux pixels de rêver pendant la nuit",
    "Consentir à la migration saisonnière des données",
    "Valider la fermentation lente du cache navigateur",
    "Autoriser les statistiques astrologiques personnalisées",
    "Accepter l'alignement cosmique des serveurs",
    "Permettre la compression existentielle",
    "Autoriser les sauvegardes interdimensionnelles",
    "Activer la détection de vibes UX",
    "Autoriser la télépathie marketing",
    "Synchroniser les cookies avec la météo émotionnelle",
    "Permettre la traduction des intentions utilisateur",
    "Activer le mode paranoïa analytique",
    "Autoriser la duplication symbolique du consentement",
    "Accepter la gravité variable des sessions",
    "Autoriser la persistance karmique des préférences",
    "Activer le rendu spirituel côté serveur",
    "Permettre l'archivage des silences numériques",
    "Autoriser l'optimisation des soupirs",
    "Accepter la maintenance préventive du destin",
    "Permettre l'indexation des souvenirs approximatifs",
    "Autoriser la fusion des onglets parallèles",
    "Activer l'équilibrage des chakras de navigation",
    "Permettre la latence poétique",
  ];

  const lenis = useLenis();
  const [checked, setChecked] = useState(
    Array(nonsenseOptions.length).fill(false),
  );
  const [submitted, setSubmitted] = useState(false);
  const [rage, setRage] = useState(false);
  const allChecked = checked.every(Boolean);

  const toggle = (index: number) => {
    const copy = [...checked];
    copy[index] = !copy[index];
    setChecked(copy);
  };

  useEffect(() => {
    if (!lenis) return;

    if (!submitted) {
      lenis.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis.start();
      document.body.style.overflow = "";
    }

    return () => {
      lenis.start();
      document.body.style.overflow = "";
    };
  }, [lenis, submitted]);

  const attemptSubmit = () => {
    if (!allChecked) {
      setRage(true);
      setTimeout(() => setRage(false), 600);
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return <div className="hcc-overlay">Merci d'avoir accepté</div>;
  }

  return (
    <div className="hcc-container">
      <div className="hcc-content">
        <h2>Veuillez accepter toutes les options afin d'accéder au site</h2>
        <div className="hcc-options" data-lenis-prevent>
          {nonsenseOptions.map((label, i) => (
            <label key={i} className="hcc-option">
              <input
                type="checkbox"
                checked={checked[i]}
                onChange={() => toggle(i)}
              />
              {label}
            </label>
          ))}
        </div>
        <div className="hcc-footer">
          <button onClick={attemptSubmit}>J'accepte les conditions</button>
        </div>
        {!allChecked && (
          <p className="hcc-warning">⚠ Vous devez absolument tout cocher.</p>
        )}
      </div>
    </div>
  );
}
