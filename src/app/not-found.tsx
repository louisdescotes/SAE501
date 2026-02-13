import "@/styles/404.scss";

const NotFoundPage = () => {
  return (
    <main className="grid-p columns error">
      <h1>404</h1>
      <div className="error-text">
        <p className="type-18">
          La page que vous essayez d’accéder n’est sûrement pas correcte. <br />
          Nous vous prions de nous excuser pour ce désagrément. <br />
          Nous vous recommandons de retourner à l’accueil pour continuer votre
          expérience
        </p>
        <a href="/">
          <button>Revenir à l'accueil</button>
        </a>
      </div>
    </main>
  );
};

export default NotFoundPage;
