document.addEventListener('DOMContentLoaded', function() {
    const players = [
        {
            "name": "Lionel Messi",
            "photo": "https://cdn.sofifa.net/players/158/023/25_120.png",
            "position": "RW",
            "nationality": "Argentina",
            "flag": "https://cdn.sofifa.net/flags/ar.png",
            "club": "Inter Miami",
            "logo": "https://cdn.sofifa.net/meta/team/239235/120.png",
            "rating": 93,
            "pace": 85,
            "shooting": 92,
            "passing": 91,
            "dribbling": 95,
            "defending": 35,
            "physical": 65
        },
        {
            "name": "Cristiano Ronaldo",
            "photo": "https://cdn.sofifa.net/players/020/801/25_120.png",
            "position": "ST",
            "nationality": "Portugal",
            "flag": "https://cdn.sofifa.net/flags/pt.png",
            "club": "Al Nassr",
            "logo": "https://cdn.sofifa.net/meta/team/2506/120.png",
            "rating": 91,
            "pace": 84,
            "shooting": 94,
            "passing": 82,
            "dribbling": 87,
            "defending": 34,
            "physical": 77
        },
        {
            "name": "Kevin De Bruyne",
            "photo": "https://cdn.sofifa.net/players/192/985/25_120.png",
            "position": "CM",
            "nationality": "Belgium",
            "flag": "https://cdn.sofifa.net/flags/be.png",
            "club": "Manchester City",
            "logo": "https://cdn.sofifa.net/players/239/085/25_120.png",
            "rating": 91,
            "pace": 74,
            "shooting": 86,
            "passing": 93,
            "dribbling": 88,
            "defending": 64,
            "physical": 78
        }
    ];

    const container = document.getElementById('player-cards-container');

    players.forEach(player => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="top-info">${player.rating}</div>
            <div class="stat-position">${player.position}</div>
            <img src="${player.photo}" alt="${player.name}" class="player-image">
            <div class="player-name">${player.name}</div>
            <div class="stats">
                <div class="stat">
                    <span class="stat-label">PAC</span>
                    <span class="stat-value">${player.pace}</span>
                </div>
                <div class="stat">
                    <span class="stat-label">SHO</span>
                    <span class="stat-value">${player.shooting}</span>
                </div>
                <div class="stat">
                    <span class="stat-label">PAS</span>
                    <span class="stat-value">${player.passing}</span>
                </div>
                <div class="stat">
                    <span class="stat-label">DRI</span>
                    <span class="stat-value">${player.dribbling}</span>
                </div>
                <div class="stat">
                    <span class="stat-label">DEF</span>
                    <span class="stat-value">${player.defending}</span>
                </div>
                <div class="stat">
                    <span class="stat-label">PHY</span>
                    <span class="stat-value">${player.physical}</span>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
});

