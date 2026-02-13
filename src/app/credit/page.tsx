import "./style.scss";

const Credit = () => {
  return (
    <main className="credit grid-p ">
      <section className="credit-section columns">
        <h1>Crédit</h1>
      </section>
      <section className="credit-text">
        <div>
          <h2 className="type-42">Fait par</h2>
          <p>
            DESCOTES Louis, dans le cadre de la SAE 501 de sa 3e année de MMI à
            l’IUT de Haguenau.
          </p>
        </div>
        <div>
          <h2 className="type-42">Code source pris ou modifier</h2>
          <ul>
            <li>
              <a href="https://smrghsh.github.io/butterfly/" no-follow>
                https://smrghsh.github.io/butterfly/
              </a>
            </li>
            <li>
              <a
                href="https://codesandbox.io/p/sandbox/webgl-grass-3rk1o6?file=%2Fsrc%2Findex.js"
                no-follow
              >
                https://codesandbox.io/p/sandbox/webgl-grass-3rk1o6?file=%2Fsrc%2Findex.js
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="type-42">Model 3D</h2>
          <ul>
            <li>
              <a
                href="https://sketchfab.com/3d-models/like-button-fec3401d61174e2ab41464eee2c8b1fb"
                no-follow
              >
                https://sketchfab.com/3d-models/like-button-fec3401d61174e2ab41464eee2c8b1fb
              </a>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
};
export default Credit;
