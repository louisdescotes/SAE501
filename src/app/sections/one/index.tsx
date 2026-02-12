import "./style.scss";
const One = () => {
  return (
    <section className="one">
      <div className="grid-p one-header">
        <h2 className="one-header-title">
          <span>L’impatience</span> n’est pas un défaut. C’est un{" "}
          <span>symptôme.</span>
        </h2>
        <p className="type-18 one-header-text">
          Nous avons appris à vivre dans un environnement où tout est optimisé
          pour la rapidité. Les interfaces sont fluides, les réponses
          immédiates, les délais compressés. Ce qui prenait autrefois du temps
          se fait aujourd’hui en quelques secondes.
          <br />
          Le problème, ce n’est pas la vitesse. Le problème, c’est que notre
          seuil de tolérance à l’attente a été réduit.
        </p>
      </div>
    </section>
  );
};
export default One;
