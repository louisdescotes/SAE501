import SplitText from "@/src/components/textAppear";
import "./style.scss";

const Three = () => {
  return (
    <section className="three-cont">
      <div className="three grid-p columns">
        <div className="three-header">
          <h2 className="three-header-title type-42">
            La <span className="type-42">gratification immédiate</span>{" "}
            reprogramme ton cerveau
          </h2>
          <SplitText
            text="Likes, vues, notifications, réponses instantanées… chaque interaction rapide agit comme une micro-récompense. Ton cerveau apprend que la validation doit arriver tout de suite, sans délai. <br /> Résultat : plus les récompenses sont rapides et fréquentes, plus l’attente devient difficile à tolérer."
            className="type-18 three-header-text"
            as="p"
          />
          <a href="/mauvaisepage">
            <button>Y aller</button>
          </a>
        </div>
        <span className="three-number number-section">III</span>
      </div>
    </section>
  );
};
export default Three;
