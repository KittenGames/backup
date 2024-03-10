document.addEventListener('DOMContentLoaded', function() {
  const homeButton = document.getElementById('home-btn');
  const addGameButton = document.getElementById('add-game-btn');
  const resetStorageButton = document.getElementById('reset-storage-btn');

  homeButton.addEventListener('click', function() {
    window.location.href = 'index.html';
  });

  addGameButton.addEventListener('click', function() {
    const jsonUrl = prompt('Enter the URL of the JSON file containing the games:');
    if (jsonUrl) {
      fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
          // Get existing games from localStorage or create an empty array
          const existingGames = JSON.parse(localStorage.getItem('customGames')) || [];
          // Concatenate new games with existing ones and append them
          const updatedGames = existingGames.concat(data);
          // Save updated games in localStorage
          localStorage.setItem('customGames', JSON.stringify(updatedGames));
          // Refresh the games list
          loadGames(updatedGames);
        })
        .catch(error => {
          console.error('Error fetching games:', error);
          alert('Error loading games. Please check the URL and try again.');
        });
    }
  });

  resetStorageButton.addEventListener('click', function() {
    if (confirm('Are you sure you want to reset all games?')) {
      localStorage.removeItem('customGames');
      loadGames([]);
      // Reload the page after resetting local storage
      window.location.reload();
    }
  });

  function loadGames(gamesData) {
    const gamesContainer = document.getElementById('games-container');
    gamesContainer.innerHTML = '';

    gamesData.forEach(game => {
      const gameCard = document.createElement('div');
      gameCard.classList.add('game-card');

      const img = document.createElement('img');
      img.src = game.image;
      gameCard.appendChild(img);

      const gameInfo = document.createElement('div');
      gameInfo.classList.add('game-info');

      const name = document.createElement('h2');
      name.textContent = game.name;
      gameInfo.appendChild(name);

      const playButton = document.createElement('button');
      playButton.textContent = 'Play';
      playButton.addEventListener('click', function() {
        const encodedUrl = btoa(game.url);
        window.location.href = `play?game=${encodedUrl}`;
      });
      gameInfo.appendChild(playButton);

      gameCard.appendChild(gameInfo);

      gamesContainer.appendChild(gameCard);
    });
  }

  const storedGames = JSON.parse(localStorage.getItem('customGames'));
  if (storedGames) {
    loadGames(storedGames);
  } else {
    fetch('https://raw.githubusercontent.com/CodingKitten-YT/KittenGames-gamelibrary/main/games.json')
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('customGames', JSON.stringify(data));
        loadGames(data);
      })
      .catch(error => console.error('Error fetching default games:', error));
  }
});
