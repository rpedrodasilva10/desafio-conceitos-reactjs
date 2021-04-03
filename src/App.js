import React, { useEffect, useState } from 'react';
import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then((res) => {
      setRepositories(res.data);
      console.log(res.data);
    });
  }, []);

  async function handleAddRepository() {
    const postResponse = await api.post('/repositories', {
      title: `Project ${Date.now()}`,
      url: 'https://teste.com.br/repo',
      techs: ['React Native, Java'],
    });

    setRepositories([...repositories, postResponse.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const diffRepositories = repositories.filter((repo) => repo.id !== id);

    setRepositories(diffRepositories);
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button
              key={repo.id}
              onClick={() => handleRemoveRepository(repo.id)}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
