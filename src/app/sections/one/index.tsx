import TextAppear from "@/src/components/textAppear";
import "./style.scss";
const One = () => {
  return (
    <section className="one">
      <div className="grid-p one-header">
        <TextAppear
          text="L’impatience n’est pas un défaut. 
          C’est un symptôme."
          className="type-40 one-header-title"
        />
        <TextAppear
          delay={0.1}
          className="type-18 one-header-text"
          text="Nous avons appris à vivre dans un environnement où tout est optimisé
          pour la rapidité. Les interfaces sont fluides, les réponses
          immédiates, les délais compressés. Ce qui prenait autrefois du temps
          se fait aujourd’hui en quelques secondes. Le problème, ce n’est pas la
          vitesse. Le problème, c’est que notre seuil de tolérance à l’attente a
          été réduit."
        />
      </div>
    </section>
  );
};
export default One;
