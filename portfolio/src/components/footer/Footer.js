import React from 'react';
import gitHub from '../../img/icons/gitHub.svg';
import linkedIn from '../../img/icons/linkedIn.svg';
import './Footer.css';
import useGsapAnimation from '../../hooks/useGsapAnimation';

export default function Footer() {

  useGsapAnimation('.social__item:first-child', { x: -50, opacity: 0, dsrection: 2, ease: 'power1.out' }, '.footer');
  useGsapAnimation('.social__item:last-child', { x: 50, opacity: 0, dsrection: 2, ease: 'power1.out' }, '.footer');
  useGsapAnimation('.copyright', { y: 100, opacity: 0, dsrection: 2, ease: 'power1.out' }, '.footer');

  return (
      <footer className="footer">
        <div className="container">
            <div className="footer__wrapper">
                <ul className="social">
                    <li className="social__item">
                      <a href="https://github.com/Yura-Si4kar">
                        <img src={gitHub} alt="Link"/>
                      </a>
                    </li>
                    <li className="social__item">
                      <a href="https://www.linkedin.com/in/yurii-sichkar-512387249/">
                        <img src={linkedIn} alt="Link"/>
                      </a>
                    </li>
                </ul>
                <div className="copyright">
                    <p>© 2023</p>
                </div>
            </div>
        </div>
      </footer> 
  )
}
