import React from 'react';
import './GitHubBtn.css';
import img from './gitHub-black.svg';

export default function GitHubBtn({link}) {
  return (
    <a href={link} target='_blank' rel='noreferrer' className="btn-outline">
        <img src={img} alt="" />
        GitHub repo
    </a>
  )
}
