let selectedPosition = null;
let currentPlayers = {};

function initializePitchEvents() {
    const pitch = document.getElementById('pitch');
    const searchPopup = document.getElementById('searchPlayerPopup');
    const closeSearchPopup = document.getElementById('closeSearchPopup');
    const playerSearch = document.getElementById('playerSearch');
    const searchResults = document.getElementById('searchResults');

    // Add click event to pitch positions
    pitch.addEventListener('click', (e) => {
        if (e.target.classList.contains('player')) {
            selectedPosition = e.target;
            searchPopup.style.display = 'block';
            playerSearch.value = '';
            searchPlayers('');
        }
    });

    // Close popup when clicking the close button
    closeSearchPopup.addEventListener('click', () => {
        searchPopup.style.display = 'none';
    });

    // Search functionality
    playerSearch.addEventListener('input', (e) => {
        searchPlayers(e.target.value);
    });

    // Store players when switching formations
    const formationSelect = document.getElementById('formation');
    formationSelect.addEventListener('change', (e) => {
        // Store all current players before changing formation
        const positions = document.querySelectorAll('.player');
        positions.forEach(pos => {
            if (pos.dataset.playerName && pos.querySelector('img')) {
                const top = pos.style.top;
                const left = pos.style.left;
                const positionKey = `${top}-${left}`;
                
                currentPlayers[positionKey] = {
                    name: pos.dataset.playerName,
                    image: pos.querySelector('img').src,
                    top: top,
                    left: left
                };
            }
        });

        // After new formation is set, restore players
        setTimeout(() => {
            const newPositions = document.querySelectorAll('.player');
            newPositions.forEach(pos => {
                const positionKey = `${pos.style.top}-${pos.style.left}`;
                const storedPlayer = currentPlayers[positionKey];
                
                if (storedPlayer) {
                    pos.innerHTML = '';
                    
                    const playerImg = document.createElement('img');
                    playerImg.src = storedPlayer.image;
                    playerImg.alt = storedPlayer.name;
                    playerImg.style.width = '100%';
                    playerImg.style.height = '100%';
                    playerImg.style.borderRadius = '50%';
                    pos.appendChild(playerImg);
                    
                    const deleteBtn = document.createElement('button');
                    deleteBtn.className = 'delete-player';
                    deleteBtn.innerHTML = '×';
                    deleteBtn.addEventListener('click', function(e) {
                        e.stopPropagation();
                        e.preventDefault();
                        const positionToDelete = this.closest('.player');
                        if (positionToDelete) {
                            const key = `${positionToDelete.style.top}-${positionToDelete.style.left}`;
                            delete currentPlayers[key];
                            positionToDelete.innerHTML = '';
                            positionToDelete.dataset.playerName = '';
                        }
                    });
                    pos.appendChild(deleteBtn);
                    pos.dataset.playerName = storedPlayer.name;
                }
            });
        }, 100);
    });
}

function searchPlayers(query) {
    const searchResults = document.getElementById('searchResults');
    // Get all players from your players list
    const players = Array.from(document.querySelectorAll('.card')).map(card => ({
        name: card.querySelector('.player-name').textContent,
        image: card.querySelector('.player-image').src,
        position: card.querySelector('.stat-position').textContent
    }));

    // Filter players based on search query
    const filteredPlayers = players.filter(player => 
        player.name.toLowerCase().includes(query.toLowerCase())
    );

    // Display results
    searchResults.innerHTML = filteredPlayers.map(player => `
        <div class="search-result-item" onclick="selectPlayer('${player.name}', '${player.image}')">
            <img src="${player.image}" alt="${player.name}">
            <span>${player.name} (${player.position})</span>
        </div>
    `).join('');
}

function selectPlayer(playerName, playerImage) {
    if (selectedPosition) {
        // Check if player is already on the pitch
        const existingPositions = document.querySelectorAll('.player');
        for (let pos of existingPositions) {
            if (pos !== selectedPosition && pos.dataset.playerName === playerName) {
                alert('This player is already on the pitch!');
                document.getElementById('searchPlayerPopup').style.display = 'none';
                return;
            }
        }

        // Store original position text
        const positionText = selectedPosition.textContent;
        
        // Clear the position first
        selectedPosition.innerHTML = '';
        selectedPosition.dataset.playerName = '';
        
        // Create and add the player image
        const playerImg = document.createElement('img');
        playerImg.src = playerImage;
        playerImg.alt = playerName;
        playerImg.style.width = '100%';
        playerImg.style.height = '100%';
        playerImg.style.borderRadius = '50%';
        selectedPosition.appendChild(playerImg);

        // Ajouter un div pour les infos du joueur
        const playerInfo = document.createElement('div');
        playerInfo.className = 'player-info';
        playerInfo.innerHTML = `
            <span class="player-name-display">${playerName}</span>
            <span class="player-rating-display">${getRatingForPlayer(playerName)}</span>
        `;
        selectedPosition.appendChild(playerInfo);
        
        // Create and add the delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-player';
        deleteBtn.innerHTML = '×';
        deleteBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            const positionToDelete = this.closest('.player');
            if (positionToDelete) {
                const key = `${positionToDelete.style.top}-${positionToDelete.style.left}`;
                delete currentPlayers[key];
                positionToDelete.innerHTML = positionText; // Reset to original position text
                positionToDelete.dataset.playerName = '';
            }
        });
        selectedPosition.appendChild(deleteBtn);

        // Store player name and update currentPlayers
        selectedPosition.dataset.playerName = playerName;
        const positionKey = `${selectedPosition.style.top}-${selectedPosition.style.left}`;
        currentPlayers[positionKey] = {
            name: playerName,
            image: playerImage,
            top: selectedPosition.style.top,
            left: selectedPosition.style.left
        };
    }
    document.getElementById('searchPlayerPopup').style.display = 'none';
}

// Ajouter cette nouvelle fonction pour obtenir le rating du joueur
function getRatingForPlayer(playerName) {
    const playerCard = document.querySelector(`.card[data-name="${playerName}"]`);
    return playerCard ? playerCard.querySelector('.top-info').textContent : '';
}

// Initialize when the document is loaded
document.addEventListener('DOMContentLoaded', initializePitchEvents);
