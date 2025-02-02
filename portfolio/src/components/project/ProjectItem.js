import React from 'react';
import { NavLink } from 'react-router-dom';
import './ProjectItem.css';

export default function ProjectItem({ project }) {
  return (
    <NavLink to={`/project/${project.id}`}>
      <li className="project">
        <iframe 
          title={project.title}
          src={project.src}
          className='project__iframe'
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          scrolling='no'
        >
        </iframe>
        <h3 className="project__title">{project.title}</h3>
      </li>
    </NavLink>
  )
}