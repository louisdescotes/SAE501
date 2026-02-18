import SplitText from "@/src/components/textAppear";
import "./style.scss";

const Seven = () => {
  return (
    <section className="seven-cont">
      <div className="seven grid-p columns">
        <div className="seven-header">
          <h2 className="seven-header-title type-42">
            Chaque détail <span className="type-42">compte</span>
          </h2>
          <SplitText
            as="p"
            text="Même le site le plus impressionnant peut perdre toute crédibilité si de petits détails sont négligés. Les interactions, les transitions, la cohérence des éléments : chacun influence l’expérience. Un détail manqué peut transformer un site “wow” en une expérience frustrante.."
            className="type-18 seven-header-text"
          />
        </div>
      </div>
    </section>
  );
};
export default Seven;
