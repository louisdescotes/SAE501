"use client";

import "./style.scss";

export default function PageBlockLoader() {
  return (
    <div className="page-loader">
      <div className="page-loader__content">
        <div className="page-loader__bar">
          <div className="page-loader__progress" />
        </div>
        <p className="page-loader__text">Chargement...</p>
      </div>
    </div>
  );
}
