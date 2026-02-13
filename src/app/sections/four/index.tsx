"use client";

import { forwardRef } from "react";
import "./style.scss";

const Four = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section ref={ref} className="four-cont">
      <div className="four grid-p columns">
        <div className="four-header">
          <h2 className="four-header-title type-42">
            La <span>solution</span> n’est pas de tout arrêter
          </h2>
          <p className="type-18 four-header-text">
            Fuir, couper, ralentir le monde autour de toi ne change rien.
            L’impatience ne disparaît pas avec l’environnement. Elle disparaît
            quand tu réapprends à gérer ton temps et à accepter le rythme
            naturel des choses.
          </p>
          <div className="four-header-send">
            <input className="four-header-send-input" type="text" />
            <button className="white">Envoyer</button>
          </div>
        </div>

        <span className="four-number number-section number-white">IV</span>

        <div className="four-hole">
          <p className="four-hole-invisible">CE N'EST PAS</p>
        </div>
      </div>
    </section>
  );
});

Four.displayName = "Four";
export default Four;
