const formationsData = [
  {
    name: '4-3-3',
    positions: [
      { x: 400, y: 570, position: 'GK' },
      { x: 300, y: 450, position: 'CB' },
      { x: 500, y: 450, position: 'CB' },
      { x: 750, y: 480, position: 'RB' },
      { x: 50, y: 480, position: 'LB' },
      { x: 100, y: 250, position: 'CM' },
      { x: 650, y: 250, position: 'CM' },
      { x: 380, y: 250, position: 'CM' },
      { x: 160, y: 100, position: 'LW' },
      { x: 390, y: 90, position: 'ST' },
      { x: 600, y: 100, position: 'RW' }
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
const positionSelect = document.getElementById('position');
const addPlayerButton = document.getElementById('addbutton');
const popupForm = document.getElementById('popupForm');
const closePopupButton = document.getElementById('closePopup');
const playerForm = document.getElementById('playerForm');
const playersList = document.getElementById('playersList');

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
  fetch('players.json')
    .then(response => response.json())
    .then(data => {
      playersListElement.innerHTML = '';
      data.players.forEach(player => {
        const playerCard = createPlayerCard(player);
        playersListElement.innerHTML += playerCard;
      });
      
      // Add event listeners to all cards after they're created
      updateExistingCards();
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

positionSelect.addEventListener('change', function() {
  const isGoalkeeper = this.value === 'GK';
  
  // Mettre à jour les labels
  document.querySelector('label[for="diving"]').textContent = isGoalkeeper ? 'Diving:' : 'Pace:';
  document.querySelector('label[for="handling"]').textContent = isGoalkeeper ? 'Handling:' : 'Shooting:';
  document.querySelector('label[for="kicking"]').textContent = isGoalkeeper ? 'Kicking:' : 'Passing:';
  document.querySelector('label[for="reflexes"]').textContent = isGoalkeeper ? 'Reflexes:' : 'Dribbling:';
  document.querySelector('label[for="speed"]').textContent = isGoalkeeper ? 'Speed:' : 'Defending:';
  document.querySelector('label[for="positioning"]').textContent = isGoalkeeper ? 'Positioning:' : 'Physical:';
});






// fonction pour creer les cartes de joueur et les affichés dans la section All Players
function createPlayerCard(player) {
  // Add data attributes to store player info
  const cardStart = `
    <div class="card" 
      data-name="${player.name}"
      data-photo="${player.photo}"
      data-position="${player.position}"
      data-nationality="${player.nationality}"
      data-club="${player.club}"
      data-logo="${player.logo}"
      data-rating="${player.rating}"
    `;

  if (player.position === 'GK') {
    return `${cardStart}
      data-diving="${player.diving}"
      data-handling="${player.handling}"
      data-kicking="${player.kicking}"
      data-reflexes="${player.reflexes}"
      data-speed="${player.speed}"
      data-positioning="${player.positioning}"
    >
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
      <div class="flag-container">
        <img src="${player.flag}" alt="${player.nationality} flag" class="player-flag">
      </div>
      <div class="card-actions">
          <button class="btn-edit">Edit</button>
          <button class="btn-delete">Delete</button>
      </div>
    </div>
    `;
  } else {
    return `${cardStart}
      data-pace="${player.pace}"
      data-shooting="${player.shooting}"
      data-passing="${player.passing}"
      data-dribbling="${player.dribbling}"
      data-defending="${player.defending}"
      data-physical="${player.physical}"
    >
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
      <div class="flag-container">
        <img src="${player.flag}" alt="${player.nationality} flag" class="player-flag">
      </div>
      <div class="card-actions">
          <button class="btn-edit">Edit</button>
          <button class="btn-delete">Delete</button>
      </div>
    </div>
    `;
  }
}

// Add this new function to handle edit button clicks
function handleEditClick(editButton) {
  const card = editButton.closest('.card');
  const popupForm = document.getElementById('popupForm');
  
  // Fill form with existing player data
  document.getElementById('name').value = card.dataset.name;
  document.getElementById('photo').value = card.dataset.photo;
  document.getElementById('position').value = card.dataset.position;
  document.getElementById('nationality').value = card.dataset.nationality;
  document.getElementById('flag').value = card.querySelector('.player-flag').src;
  document.getElementById('club').value = card.dataset.club;
  document.getElementById('logo').value = card.dataset.logo;
  document.getElementById('rating').value = card.dataset.rating;

  if (card.dataset.position === 'GK') {
    document.getElementById('diving').value = card.dataset.diving;
    document.getElementById('handling').value = card.dataset.handling;
    document.getElementById('kicking').value = card.dataset.kicking;
    document.getElementById('reflexes').value = card.dataset.reflexes;
    document.getElementById('speed').value = card.dataset.speed;
    document.getElementById('positioning').value = card.dataset.positioning;
  } else {
    document.getElementById('diving').value = card.dataset.pace;
    document.getElementById('handling').value = card.dataset.shooting;
    document.getElementById('kicking').value = card.dataset.passing;
    document.getElementById('reflexes').value = card.dataset.dribbling;
    document.getElementById('speed').value = card.dataset.defending;
    document.getElementById('positioning').value = card.dataset.physical;
  }

  // Change form submit button text
  const submitButton = playerForm.querySelector('button[type="submit"]');
  submitButton.textContent = 'Save Changes';
  
  // Store reference to the card being edited
  playerForm.dataset.editingCard = Array.from(playersList.children).indexOf(card);
  
  popupForm.style.display = 'flex';
}

// Modify the form submission handler
playerForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const position = document.getElementById('position').value;
  const playerData = {
    name: document.getElementById('name').value,
    photo: document.getElementById('photo').value,
    position: position,
    nationality: document.getElementById('nationality').value,
    flag: document.getElementById('flag').value,
    club: document.getElementById('club').value,
    logo: document.getElementById('logo').value,
    rating: document.getElementById('rating').value,
  };

  // Add stats based on position
  if (position === 'GK') {
    playerData.diving = document.getElementById('diving').value;
    playerData.handling = document.getElementById('handling').value;
    playerData.kicking = document.getElementById('kicking').value;
    playerData.reflexes = document.getElementById('reflexes').value;
    playerData.speed = document.getElementById('speed').value;
    playerData.positioning = document.getElementById('positioning').value;
  } else {
    playerData.pace = document.getElementById('diving').value;
    playerData.shooting = document.getElementById('handling').value;
    playerData.passing = document.getElementById('kicking').value;
    playerData.dribbling = document.getElementById('reflexes').value;
    playerData.defending = document.getElementById('speed').value;
    playerData.physical = document.getElementById('positioning').value;
  }

  const playerCardHTML = createPlayerCard(playerData);
  
  if (playerForm.dataset.editingCard) {
    // Update existing card
    const index = parseInt(playerForm.dataset.editingCard);
    const oldCard = playersList.children[index];
    oldCard.outerHTML = playerCardHTML;
    
    // Add event listeners to the new card
    const newCard = playersList.children[index];
    addCardEventListeners(newCard);
    
    // Reset editing state
    delete playerForm.dataset.editingCard;
  } else {
    // Add new card
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = playerCardHTML.trim();
    const playerCardElement = tempDiv.firstChild;
    playersList.prepend(playerCardElement);
    addCardEventListeners(playerCardElement);
  }

  // Reset form and hide popup
  playerForm.reset();
  popupForm.style.display = 'none';
  
  // Reset submit button text
  const submitButton = playerForm.querySelector('button[type="submit"]');
  submitButton.textContent = 'Add Player';
});

// Helper function to add event listeners to card buttons
function addCardEventListeners(card) {
  const deleteButton = card.querySelector('.btn-delete');
  const editButton = card.querySelector('.btn-edit');
  
  deleteButton.addEventListener('click', function() {
    this.closest('.card').remove();
  });
  
  editButton.addEventListener('click', function() {
    handleEditClick(this);
  });
}

// Update existing cards with event listeners
function updateExistingCards() {
  document.querySelectorAll('.card').forEach(card => {
    addCardEventListeners(card);
  });
}

// Call this after loading initial cards
updateExistingCards();

addPlayerButton.addEventListener('click', () => {
  // Reset form and change button text to "Add Player"
  playerForm.reset();
  const submitButton = playerForm.querySelector('button[type="submit"]');
  submitButton.textContent = 'Add Player';
  delete playerForm.dataset.editingCard;
  
  // Show popup
  popupForm.style.display = 'flex';
});

closePopupButton.addEventListener('click', () => {
  popupForm.style.display = 'none';
});