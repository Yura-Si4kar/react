import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Contacts() {
    const titleRef = useRef();

    useEffect(() => {
        let title = titleRef.current;
        const letters = title.innerText.split('');
        title.innerHTML = '';

        letters.forEach((letter, i) => {
            const span = document.createElement('span');
            span.classList.add('contacts-letter');
            span.style.display = 'inline-block';
            span.textContent = letter;
            title.appendChild(span);

            const animations = [
                { x: -50, opacity: 0, duration: 1, ease: 'circ.inOut', rotate: 360 },
                { y: -50, opacity: 0, duration: 1, ease: 'power2.out', scale: 0.5 },
                { x: 50, opacity: 0, duration: 1, ease: 'back.out(1.7)', rotate: -360 },
                { y: 50, opacity: 0, duration: 1, ease: 'elastic.out(1, 0.3)', scale: 1.2 }
            ];

            const animation = animations[i % animations.length];
            gsap.from(span, {
                ...animation,
                delay: i * 0.1
            });
        });

        const items = document.querySelectorAll('.content-list__item');
        items.forEach((item, index) => {
            const title = item.querySelector('h2');
            const content = item.querySelector('p');

            const tl = gsap.timeline({ delay: index * 0.3 });

            // Анімація заголовка
            tl.from(title, { x: -50, opacity: 0, duration: 1, ease: 'circ.out' })
              .from(content, { y: 20, opacity: 0, duration: 1, ease: 'power1.out' }, '-=0.5');
        });
    }, []);


    return (
        <main className="section">
            <div className="container">
                <h1 className="title-1" ref={titleRef}>Contacts</h1>

                <ul className="content-list">
                    <li className="content-list__item">
                        <h2 className="title-2" id="location">Location</h2>
                        <p>Vinnitsa, Ukraine</p>
                    </li>
                    <li className="content-list__item">
                        <h2 className="title-2" id="phone">Telegram / Viber</h2>
                        <p><a href="tel:+380971297960">+38 (097) 129-79-60</a></p>
                    </li>
                    <li className="content-list__item">
                        <h2 className="title-2" id="email">Email</h2>
                        <p><a href="mailto:webdev@protonmail.com">si4kar2017@gmail.com</a></p>
                    </li>
                </ul>
            </div>
        </main>
    );
}
