import React, { useEffect } from "react";

export default function Loading() {
  useEffect(() => {
    (function () {
      let source = document.querySelector(".box");

      let mirror = source.cloneNode(true);
      mirror.classList.add("mirror");

      source.appendChild(mirror);
    })();
  }, []);

  return (
    <section className="block">
      <div className="box">
        <div className="loader">
          <div className="ball"></div>
        </div>
      </div>
    </section>
  );
}
