import SplitText from "@/src/components/textAppear";
import "./style.scss";

const Five = () => {
  return (
    <section className="five-cont">
      <div className="five grid-p columns">
        <div className="five-header">
          <h2 className="five-header-title type-42">
            Comment la <span className="type-42">réintroduire</span>
          </h2>
          <SplitText
            as="p"
            text="La patience se reconstruit pas à pas, en réintroduisant des pauses volontaires dans ton quotidien. <br /> Réduis les distractions, finis une tâche avant d’en commencer une autre, accepte que certaines réponses prennent du temps et laisse des espaces vides dans ton rythme. <br /> Ce n’est pas spectaculaire, mais c’est durable. La patience revient quand ton esprit retrouve son équilibre."
            className="type-18 five-header-text"
          />
        </div>
        <span className="five-number number-section">V</span>
      </div>
    </section>
  );
};
export default Five;
