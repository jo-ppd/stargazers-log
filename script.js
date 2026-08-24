const repositoryList = document.querySelector('#repository-list');
const repositoryCount = document.querySelector('#repository-count');
const statusMessage = document.querySelector('#status');

function formatStars(stars) {
  return new Intl.NumberFormat('en', { notation: 'compact' }).format(stars);
}

function renderRepositories(repositories) {
  repositoryList.innerHTML = repositories.map((repository) => `
    <li class="repository-card">
      <div>
        <a class="repository-link" href="${repository.url}" target="_blank" rel="noreferrer">
          ${repository.name}
        </a>
        <div class="repository-owner">${repository.owner} / ${repository.name}</div>
      </div>
      <p class="repository-description">${repository.description}</p>
      <div class="repository-meta">
        <span>${repository.language}</span>
        <span>${formatStars(repository.stars)} stars</span>
      </div>
    </li>
  `).join('');

  repositoryCount.textContent = `${repositories.length} repositories`;
  statusMessage.hidden = true;
}

async function loadRepositories() {
  try {
    const response = await fetch('events.json');

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const repositories = await response.json();
    renderRepositories(repositories);
  } catch (error) {
    statusMessage.classList.add('error');
    statusMessage.textContent = 'Repositories could not be loaded. Please try again.';
    console.error(error);
  }
}

loadRepositories();