document.addEventListener('DOMContentLoaded', function() {
  const gamesContainer = document.getElementById('games-container');

  function loadGames() {
    gamesContainer.innerHTML = '';

    fetch('https://raw.githubusercontent.com/CodingKitten-YT/KittenGames-gamelibrary/main/games.json')
      .then(response => response.json())
      .then(data => {
        data.forEach(game => {
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
            window.location.href = `play.html?game=${encodedUrl}`;
          });
          gameInfo.appendChild(playButton);

          gameCard.appendChild(gameInfo);

          gamesContainer.appendChild(gameCard);
        });
      })
      .catch(error => console.error('Error fetching games:', error));
  }

  loadGames();
});
