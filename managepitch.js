let selectedPosition = null;

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

        // Clear the position first
        selectedPosition.innerHTML = '';
        
        // Create and add the player image
        const playerImg = document.createElement('img');
        playerImg.src = playerImage;
        playerImg.alt = playerName;
        playerImg.style.width = '100%';
        playerImg.style.height = '100%';
        playerImg.style.borderRadius = '50%';
        selectedPosition.appendChild(playerImg);
        
        // Create and add the delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-player';
        deleteBtn.innerHTML = '×';
        deleteBtn.addEventListener('click', function(e) {
            e.stopPropagation();  // Stop the click from triggering the position selection
            e.preventDefault();    // Prevent any default button behavior
            const positionToDelete = this.closest('.player'); // Get the specific player position
            if (positionToDelete) {
                positionToDelete.innerHTML = '';  // Clear the position content
                positionToDelete.dataset.playerName = '';  // Clear the player name data
            }
        });
        selectedPosition.appendChild(deleteBtn);

        // Store player name for checking duplicates
        selectedPosition.dataset.playerName = playerName;
    }
    document.getElementById('searchPlayerPopup').style.display = 'none';
}

// Initialize when the document is loaded
document.addEventListener('DOMContentLoaded', initializePitchEvents);
