import TextAppear from "@/src/components/textAppear";
import "./style.scss";
import SplitText from "@/src/components/textAppear";

const One = () => {
  return (
    <section className="one-cont">
      <div className="one grid-p columns">
        <div className="one-header">
          <h2 className="one-header-title type-42">
            <span className="type-42">L’impatience</span> n’est pas un défaut.
            C’est un <span className="type-42">symptôme.</span>
          </h2>
          <SplitText
            as="p"
            text="Nous avons appris à vivre dans un environnement où tout est optimisé pour la rapidité. Les interfaces sont fluides, les réponses immédiates, les délais compressés. Ce qui prenait autrefois du temps se fait aujourd’hui en quelques secondes. <br /> Le problème, ce n’est pas la vitesse. <br /> Le problème, c’est que notre seuil de tolérance à l’attente a été réduit."
            className="type-18 one-header-text"
          />
        </div>
        <span className="one-number number-section">I</span>
      </div>
    </section>
  );
};
export default One;
