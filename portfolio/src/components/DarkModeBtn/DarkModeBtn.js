import React, { useEffect } from 'react';
import { useLocalStorage } from '../../utils/useLocalStorage';
import detectDarkMode from '../../utils/detectDarkMode';

import sun from '../../img/icons/sun.svg';
import moon from '../../img/icons/moon.svg';
import './DarkModeBtn.css';
import useGsapAnimation from '../../hooks/useGsapAnimation';

export default function DarkModeBtn() {
    const btnNormal = 'dark-mode-btn';
    const btnActive = 'dark-mode-btn dark-mode-btn--active';
    const [darkMode, setDarkMode] = useLocalStorage('darkMode', detectDarkMode());

    const toggleDarkMode = (e) => {
        e.preventDefault();
        setDarkMode((currentValue) => currentValue === 'light' ? 'dark' : 'light')
    }

    useGsapAnimation('.' + btnNormal, { delay: 1, y: -50, opacity: 0, duration: 2, ease: 'elastic.out' }, '.' + btnNormal);

    useEffect(() => {
        if (darkMode === 'dark') {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark')
        }
    }, [darkMode]);

    useEffect(() => {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            const newColorScheme = e.matches ? 'dark' : 'light';
            setDarkMode(newColorScheme);
        })
    }, [setDarkMode]);


    return (
        <button className={darkMode === 'dark' ? btnActive : btnNormal} onClick={toggleDarkMode}>
            <img src={sun} alt="Light mode" className="dark-mode-btn__icon" />
            <img src={moon} alt="Dark mode" className="dark-mode-btn__icon" />
        </button>
    )
}
