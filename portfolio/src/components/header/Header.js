// Header.js

import React, { useEffect, useRef } from 'react';
import './Header.css';
import my_photo from '../../img/photo.jpg';
import useGsapAnimation from '../../hooks/useGsapAnimation';
import Squares from '../../utils/canvasAnimation';

export default function Header() {
  const canvasRef = useRef(null);
  const headerRef = useRef(null);

  useGsapAnimation('.header__block-img', { rotate: '-=360', duration: 1.5, scale: 0.1, opacity: 0, ease: 'expo.in' }, '.header__block-img img');
  useGsapAnimation('.header__title', { opacity: 0, duration: 1.5, y: -50, ease: 'power3.out' }, '.header__title');
  useGsapAnimation('.header__text', { opacity: 0, duration: 1.5, x: -200, ease: 'power3.out' }, '.header__text');
  useGsapAnimation('.btn', { opacity: 0, duration: 1.5, y: 200, ease: 'power3.out' }, '.header__text');

  useEffect(() => {
    const section = headerRef.current;
    const canvas = canvasRef.current;
    
    // Функція для налаштування розміру canvas
    const setCanvasSize = () => {
      const { width, height } = section.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
    };

    setCanvasSize();
    
    // Ініціалізація анімації квадратів
    const squares = new Squares(canvas);

    // Оновлення розмірів при зміні вікна
    const handleResize = () => {
      setCanvasSize();
      squares.updateDimensions(); // Оновлення розмірів квадратів
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <header ref={headerRef} className="header">
        <canvas ref={canvasRef} id="canvas"></canvas>
        <div className="container content">
          <article className="header__block">
            <div className="header__block-img">
              <img src={my_photo} width={500} height={400} alt="my_photo" />
            </div>
            <div className="header__wrapper">
              <h1 className="header__title">
                <strong>
                  Hi, my name is <em>Yurii</em>
                </strong>
                <br />
                a frontend developer
              </h1>
              <div className="header__text">
                <p>with passion for learning and creating.</p>
              </div>
              <a href="../../CV.pdf" className="btn" download="CV.pdf">
                Download CV
              </a>
            </div>
          </article>
        </div>
      </header>
    </>
  );
}
