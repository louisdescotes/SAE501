import "./style.scss";

const Three = () => {
  return (
    <section className="three-cont">
      <div className="three grid-p columns">
        <div className="three-header">
          <h2 className="three-header-title type-42">
            La <span>gratification immédiate</span> reprogramme ton cerveau
          </h2>
          <p className="type-18 three-header-text">
            Likes, vues, notifications, réponses instantanées… chaque
            interaction rapide agit comme une micro-récompense. Ton cerveau
            apprend que la validation doit arriver tout de suite, sans délai.{" "}
            <br />
            Résultat : plus les récompenses sont rapides et fréquentes, plus
            l’attente devient difficile à tolérer.
          </p>
          <button>Button</button>
        </div>
        <span className="three-number number-section">III</span>
      </div>
    </section>
  );
};
export default Three;
