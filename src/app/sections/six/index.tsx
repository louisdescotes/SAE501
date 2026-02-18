"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { animate, scroll } from "motion";
import "./style.scss";
import SplitText from "@/src/components/textAppear";

const images = [
  {
    img: "/images/impossible_de_naviguer_dans_le_menu.pnge",
    title: "Impossible de naviguer dans le menu",
    desc: "Le menu s'affiche dans le mauvais sens, et il est impossible de cliquer sur les éléments. L'utilisateur est perdu et frustré, incapable d'accéder aux différentes sections du site.",
  },
  {
    img: "/images/boutons_pas_clair_et_404.pnge",
    title: "Boutons non clairs et redirige vers des 404",
    desc: "Les boutons ne sont pas clairement identifiés, et cliquer dessus redirige vers des pages 404. L'utilisateur est dérouté et ne comprend pas comment naviguer correctement.",
  },
  {
    img: "/images/no_label.pnge",
    title: "Pas de labels sur les inputs",
    desc: "Les champs de formulaire ne sont pas étiquetés correctement. L'utilisateur ne comprend pas ce qu'il doit saisir dans chaque champ, ce qui rend l'expérience utilisateur confuse.",
  },
  {
    img: "/images/chargement.pnge",
    title: "Chargement aléatoire",
    desc: "Pendant la navigation, le site se met à afficher des chargements qui ne sont pas liés à l'action de l'utilisateur, ils sont énervants à revenir en arrière en plus.",
  },
  {
    img: "/images/no_good_links.pnge",
    title: "Liens non fonctionnels",
    desc: "Les images ne s'affiche pas, car il n'y a pas de liens valides vers les images.",
  },
];

const Six = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current || !horizontalRef.current) return;

    const scrollDistance =
      horizontalRef.current.scrollWidth - wrapperRef.current.offsetWidth;

    scroll(
      animate(horizontalRef.current, {
        transform: ["none", `translateX(${-scrollDistance}px)`],
      }),
      { target: wrapperRef.current },
    );
  }, []);

  return (
    <section
      className="six-wrapper"
      ref={wrapperRef}
      style={{ height: `${images.length * 100}vh`, position: "relative" }}
    >
      <div className="six-sticky">
        <motion.div className="six-horizontal" ref={horizontalRef}>
          <section className="six-cont">
            <div className="six grid-p columns">
              <div className="six-header">
                <h2 className="six-header-title type-42">
                  Mais <span className="type-42">l’impatience</span> se lie avec{" "}
                  <span className="type-42">l’expérience</span>
                </h2>
                <SplitText
                  as="p"
                  text="Même le site le plus impressionnant peut perdre toute crédibilité si de petits détails sont négligés. Les interactions, les transitions, la cohérence des éléments : chacun influence l’expérience. Un détail manqué peut transformer un site “wow” en une expérience frustrante.."
                  className="type-18 six-header-text"
                />
              </div>
            </div>
          </section>

          {images.map((src, i) => (
            <div key={i} className={`panel panel-${i + 1}`}>
              <div className="panel-cont">
                <img src={src.img} />
                <h3 className="type-32">{src.title}</h3>
                <p className="type-18">{src.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Six;
