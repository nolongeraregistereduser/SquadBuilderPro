
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

function updatePlayersList(formation) {
  playersListElement.innerHTML = '';
  formation.positions.forEach(pos => {
    const li = document.createElement('li');
    li.textContent = `${pos.position}: Player Name`;
    playersListElement.appendChild(li);
  });
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

