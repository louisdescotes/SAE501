import "./style.scss";

const Two = () => {
  return (
    <>
      <svg
        className="two-round"
        width="100%"
        viewBox="0 0 1920 586"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M960.25 40C390.5 40 0 286 0 286V585.5H1920.5V286C1920.5 286 1530 40 960.25 40Z"
          fill="#D9772A"
        ></path>
      </svg>
      <section className="two-cont">
        <div className="two columns grid-p">
          <div className="two-header">
            <h2 className="two-header-title type-42">
              L’instantanéité <span className="type-42">permanente</span>
            </h2>
            <span className="two-header-number number-section number-white">
              II
            </span>
          </div>
          <div className="two-text">
            <p className="type-18 ">
              Le cerveau s’adapte toujours à son environnement. Lorsqu’il reçoit
              régulièrement des récompenses rapides (notifications, messages,
              validations sociales...) il ajuste ses attentes.
              <br />
              Progressivement, le délai devient inconfortable. Le silence
              devient suspect. L’incertitude devient stressante.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
export default Two;
