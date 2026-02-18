"use client";

import { useState } from "react";
import { forwardRef } from "react";
import { motion } from "motion/react";
import SplitText from "@/src/components/textAppear";
import "./style.scss";

const getRandomTransform = () => ({
  x: Math.floor(Math.random() * window.innerWidth) - window.innerWidth / 2,
  y: Math.floor(Math.random() * -201) - 100,
  rotate: Math.floor(Math.random() * 60) - 30,
  scale: +(Math.random() * 0.5 + 0.75).toFixed(2),
});

const Four = forwardRef<HTMLElement>((props, ref) => {
  const [items, setItems] = useState([
    "prendre sur soi",
    "se forcer à être calme",
    "faire plus d’efforts",
    "supprimer la technologie",
    "fuir le monde moderne",
  ]);
  const [inputValue, setInputValue] = useState("");

  const addItem = () => {
    if (!inputValue.trim()) return;
    setItems((prev) => [...prev, inputValue.trim()]);
    setInputValue("");
  };

  return (
    <section ref={ref} className="four-cont">
      <div className="four grid-p columns">
        <div className="four-header">
          <h2 className="four-header-title type-42">
            La <span className="type-42">solution</span> n’est pas de tout
            arrêter
          </h2>
          <SplitText
            as="p"
            text="Fuir, couper, ralentir le monde autour de toi ne change rien. L’impatience ne disparaît pas avec l’environnement. Elle disparaît quand tu réapprends à gérer ton temps et à accepter le rythme naturel des choses."
            className="type-18 four-header-text"
          />
          <div className="four-header-send">
            <input
              className="four-header-send-input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addItem()}
            />
            <button className="white" onClick={addItem}>
              Envoyer
            </button>
          </div>
        </div>

        <span className="four-number number-section number-white">IV</span>

        <motion.div layout className="four-hole">
          <p className="four-hole-invisible type-215">CE N'EST PAS</p>
          <div className="four-hole-hole" />
          <div className="four-hole-hole-cover" />

          {items.map((item, index) => {
            const { x, y, rotate } = getRandomTransform();
            return (
              <motion.div
                key={item + index}
                className="four-hole-item"
                initial={{ x, y, rotate, scale: 1, opacity: 1 }}
                animate={{
                  x: "-50%",
                  y: "0%",
                  rotate: 0,
                  scale: 0,
                  opacity: 0,
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: index * 0.5,
                  ease: "easeInOut",
                }}
              >
                <p className="type-18 four-hole-item-text">{item}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
});

Four.displayName = "Four";
export default Four;
