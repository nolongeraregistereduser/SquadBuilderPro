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
        // Update the position with selected player
        selectedPosition.innerHTML = `
            <img src="${playerImage}" alt="${playerName}" style="width: 100%; height: 100%; border-radius: 50%;">
        `;
        // You might want to store additional player data here
    }
    document.getElementById('searchPlayerPopup').style.display = 'none';
}

// Initialize when the document is loaded
document.addEventListener('DOMContentLoaded', initializePitchEvents);
