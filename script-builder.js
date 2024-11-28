const formationsData = [
  {
    name: '4-3-3',
    positions: [
      { x: 430, y: 570, position: 'GK' },
      { x: 320, y: 480, position: 'CB' },
      { x: 550, y: 480, position: 'CB' },
      { x: 780, y: 480, position: 'RB' },
      { x: 90, y: 480, position: 'LB' },
      { x: 160, y: 250, position: 'CM' },
      { x: 700, y: 250, position: 'CM' },
      { x: 430, y: 250, position: 'CM' },
      { x: 200, y: 100, position: 'LW' },
      { x: 430, y: 90, position: 'ST' },
      { x: 650, y: 100, position: 'RW' }
    ]
  },
  {
    name: '4-4-2',
    positions: [
      { x: 430, y: 570, position: 'GK' },
      { x: 320, y: 480, position: 'CB' },
      { x: 550, y: 480, position: 'CB' },
      { x: 780, y: 480, position: 'RB' },
      { x: 90, y: 480, position: 'LB' },
      { x: 310, y: 210, position: 'CM' },
      { x: 560, y: 210, position: 'CM' },
      { x: 750, y: 200, position: 'RM' },
      { x: 150, y: 205, position: 'LM' },
      { x: 330, y: 70, position: 'ST' },
      { x: 550, y: 70, position: 'ST' }
    ]
  }
];

const pitchElement = document.getElementById('pitch');
const formationSelect = document.getElementById('formation');
const playersListElement = document.getElementById('playersList');
const teamNameInput = document.getElementById('teamNameInput');
const managerNameInput = document.getElementById('managerNameInput');
const teamNameDisplay = document.getElementById('teamName');
const managerNameDisplay = document.getElementById('managerName');
const updateInfoButton = document.getElementById('updateInfo');

function renderPlayerPositions(formation) {
  const currentPlayers = Array.from(pitchElement.querySelectorAll('.player'));
  const newPositions = formation.positions;

  // Update existing players and add new ones
  newPositions.forEach((pos, index) => {
    let playerElement;
    if (index < currentPlayers.length) {
      playerElement = currentPlayers[index];
    } else {
      playerElement = document.createElement('div');
      playerElement.className = 'player player-new';
      pitchElement.appendChild(playerElement);
    }
    playerElement.style.left = `${pos.x / 892 * 100}%`;
    playerElement.style.top = `${pos.y / 725 * 100}%`;
    playerElement.textContent = pos.position;

    // Trigger reflow to ensure the transition works
    void playerElement.offsetWidth;

    playerElement.classList.remove('player-new');
  });

  // Remove extra players
  for (let i = newPositions.length; i < currentPlayers.length; i++) {
    currentPlayers[i].classList.add('player-new');
    setTimeout(() => {
      currentPlayers[i].remove();
    }, 500); // Remove after transition ends
  }
}

function renderFormationOptions() {
  formationsData.forEach(formation => {
    const option = document.createElement('option');
    option.value = formation.name;
    option.textContent = formation.name;
    formationSelect.appendChild(option);
  });
}

function updatePlayersList() {
  // Fetch players data
  fetch('players.json')
    .then(response => response.json())
    .then(data => {
      // Clear the existing content
      playersListElement.innerHTML = '';
      
      // Create and append player cards for each player
      data.players.forEach(player => {
        const playerCard = createPlayerCard(player);
        playersListElement.innerHTML += playerCard;
      });
    })
    .catch(error => console.error('Error loading players:', error));
}

function updateTeamInfo() {
  const teamName = teamNameInput.value.trim();
  const managerName = managerNameInput.value.trim();
  
  if (teamName) {
    teamNameDisplay.textContent = teamName;
  }
  
  if (managerName) {
    managerNameDisplay.textContent = managerName;
  }
}

formationSelect.addEventListener('change', () => {
  const selectedFormation = formationsData.find(f => f.name === formationSelect.value);
  renderPlayerPositions(selectedFormation);
  updatePlayersList(selectedFormation);
});

updateInfoButton.addEventListener('click', updateTeamInfo);

renderFormationOptions();
renderPlayerPositions(formationsData[0]);
updatePlayersList(formationsData[0]);






// fonction pour creer les cartes de joueur et les affichés dans la section All Players
function createPlayerCard(player) {
  if (player.position === 'GK') {
    return `
      <div class="card">
          <div class="top-info">${player.rating}</div>
          <div class="stat-position">${player.position}</div>
          <img src="${player.photo}" alt="${player.name}" class="player-image">
          <div class="player-name">${player.name}</div>
          <div class="stats">
              <div class="stat">
                  <span class="stat-label">div</span>
                  <span class="stat-value">${player.diving}</span>
              </div>
              <div class="stat">
                  <span class="stat-label">han</span>
                  <span class="stat-value">${player.handling}</span>
              </div>
              <div class="stat">
                  <span class="stat-label">kic</span>
                  <span class="stat-value">${player.kicking}</span>
              </div>
              <div class="stat">
                  <span class="stat-label">ref</span>
                  <span class="stat-value">${player.reflexes}</span>
              </div>
              <div class="stat">
                  <span class="stat-label">spd</span>
                  <span class="stat-value">${player.speed}</span>
              </div>
              <div class="stat">
                  <span class="stat-label">pos</span>
                  <span class="stat-value">${player.positioning}</span>
              </div>
          </div>
          <div class="card-actions">
              <button class="btn-edit">Edit</button>
              <button class="btn-delete">Delete</button>
          </div>
      </div>
    `;
  } else {
    return `
      <div class="card">
          <div class="top-info">${player.rating}</div>
          <div class="stat-position">${player.position}</div>
          <img src="${player.photo}" alt="${player.name}" class="player-image">
          <div class="player-name">${player.name}</div>
          <div class="stats">
              <div class="stat">
                  <span class="stat-label">pac</span>
                  <span class="stat-value">${player.pace}</span>
              </div>
              <div class="stat">
                  <span class="stat-label">sho</span>
                  <span class="stat-value">${player.shooting}</span>
              </div>
              <div class="stat">
                  <span class="stat-label">pas</span>
                  <span class="stat-value">${player.passing}</span>
              </div>
              <div class="stat">
                  <span class="stat-label">dri</span>
                  <span class="stat-value">${player.dribbling}</span>
              </div>
              <div class="stat">
                  <span class="stat-label">def</span>
                  <span class="stat-value">${player.defending}</span>
              </div>
              <div class="stat">
                  <span class="stat-label">phy</span>
                  <span class="stat-value">${player.physical}</span>
              </div>
          </div>
          <div class="card-actions">
              <button class="btn-edit">Edit</button>
              <button class="btn-delete">Delete</button>
          </div>
      </div>
    `;
  }
}



// show popup of adding with form and logic for adding a player

 // Get elements
 const addButton = document.getElementById('addbutton');
 const popupForm = document.getElementById('popupForm');
 const closePopup = document.getElementById('closePopup');
 const playerForm = document.getElementById('playerForm');
 const playersList = document.getElementById('playersList');

 // Show the popup form when "Add Player" is clicked
 addButton.addEventListener('click', () => {
   popupForm.style.display = 'flex'; // Make the popup visible with flex
 });

 // Close the popup form when the "X" button is clicked
 closePopup.addEventListener('click', () => {
   popupForm.style.display = 'none'; // Hide the popup
 });

 // Handle form submission

 
 playerForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Récupérer les valeurs du formulaire
  const playerData = {
    name: document.getElementById('name').value,
    photo: document.getElementById('photo').value,
    position: document.getElementById('position').value,
    nationality: document.getElementById('nationality').value,
    //flag: document.getElementById('flag').value,
    club: document.getElementById('club').value,
    logo: document.getElementById('logo').value,
    rating: document.getElementById('rating').value,
    diving: document.getElementById('diving').value || 'N/A',
    handling: document.getElementById('handling').value || 'N/A',
    kicking: document.getElementById('kicking').value || 'N/A',
    reflexes: document.getElementById('reflexes').value || 'N/A',
    speed: document.getElementById('speed').value || 'N/A',
    positioning: document.getElementById('positioning').value || 'N/A'
  };

  // Ajouter la carte au conteneur
  const playerCardHTML = createPlayerCard(playerData);
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = playerCardHTML.trim();
  const playerCardElement = tempDiv.firstChild;
  playersList.prepend(playerCardElement);

  // Masquer le formulaire pop-up
  popupForm.style.display = 'none';

  // Réinitialiser le formulaire
  playerForm.reset();
});


