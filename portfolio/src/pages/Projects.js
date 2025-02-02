import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import ProjectItem from '../components/project/ProjectItem';
import { projects } from '../helpers/ProjectsList';
import useGsapAnimation from '../hooks/useGsapAnimation';

export default function Projects() {
  const titleRef = useRef();

  useLayoutEffect(() => {
    let title = titleRef.current;
    const letters = title.innerText.split('');
    title.innerHTML = '';

    const animations = [
      { y: -50, opacity: 0, duration: 1, ease: 'bounce.out' },
      { x: -50, opacity: 0, duration: 1, ease: 'elastic.out(1, 0.3)' },
      { scale: 0, opacity: 0, duration: 1, ease: 'back.out(1.7)' },
      { rotation: 360, opacity: 0, duration: 1, ease: 'circ.out' }
    ];

    letters.forEach((letter, i) => {
      let span = document.createElement('span');
      span.classList.add('project-letter');
      span.style.display = 'inline-block';
      span.textContent = letter;
      title.append(span);

      const animation = animations[i % animations.length]; // вибираємо анімацію з масиву
    
      gsap.from(span, {
        ...animation,
        delay: i * 0.2,
        repeat: -1,
        yoyo: true,
      });
    });
  }, []);
  
  useGsapAnimation('.project', { opacity: 0, x: -500, duration: 1.5, ease: 'expo.out', stagger: 0.5}, '.project');

  return (
    <main className="section">
      <div className="container">
        <h2 className="title-1" ref={titleRef}>Projects</h2>
        <ul className="projects">
          {projects.map((item) => <ProjectItem key={item.id} project={item} />)}
        </ul>
      </div>
    </main>
  )
}