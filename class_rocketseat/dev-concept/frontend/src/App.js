import React, { useState, useEffect } from 'react';

import api from './services/api';

import './App.css'

import Header from './components/Header';

function App () {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/projects')
      .then(response => {
        setProjects(response.data);
      });
  }, []);

  const handleAddProject = async () => {

      const response = await api.post('/projects', {
        title: `Novo Project ${Date.now()}`,
        owner: 'Vítor'
      });

      const { data } = response;
      setProjects([ ...projects, data ]);
    // setProjects([ ...projects, `Novo Project ${Date.now()}`]);
  }

  return (
    <>
      <Header title="Projects" />

      <ul>
        { projects.map(project => <li key={project.id}>{ project.title }</li>) }
      </ul>

      <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
    </>
  );
}

export default App;