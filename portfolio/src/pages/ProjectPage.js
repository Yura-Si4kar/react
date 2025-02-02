import React from 'react'
import { useParams } from 'react-router-dom';
import GitHubBtn from '../components/GitHubBtn/GitHubBtn';
import { projects } from '../helpers/ProjectsList';

export default function ProjectPage() {
  const params = useParams();
  const project = projects.find((project) => project.id + '' === params.id);

  return (
    <main className="section">
      <div className="container">
        <div className="project-details">
          <h1 className="title-1">{project.title}</h1>

          <iframe 
            title={project.title}
            src={project.src}
            height="650" 
            style={{
              border: '1px solid rgba(0, 0, 0, 0.5)',
              borderRadius: '15px'
            }}
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            scrolling='no'
          >
          </iframe>

          <div className="project-details__desc">
            <p>{project.skills}</p>
            <a href={project.src}>Link</a>
          </div>


          {project.gitHubLink && <GitHubBtn link={project.gitHubLink} />}          
        </div>
      </div>
    </main>
  )
}