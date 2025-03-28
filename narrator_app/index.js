const dayButton = document.getElementById('dayBtn')
const nightButton = document.getElementById('nightBtn')
const playersButton = document.getElementById('playersBtn')
const gameStatus = document.getElementById('game-status')
const playersContainer = document.getElementById('players-container')
const playersList = document.getElementById('players-list')

async function makeDay() {
    const res = await fetch('/notificar-dia', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({message: 'evento dia desde el narrador'})
    })

    const data = await res.json()
    
    if (data.status === 'success') {
        gameStatus.textContent = 'Estado: Es de día - Los jugadores han sido notificados'
        gameStatus.style.backgroundColor = '#8be9fd'
        gameStatus.style.color = '#282a36'
    }

    console.log(data)
}

async function makeNight(){
    const res = await fetch('/notificar-noche', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({message: 'evento noche desde el narrador'})
    })
    const data = await res.json()
    
    if (data.status === 'success') {
        gameStatus.textContent = 'Estado: Es de noche - Los jugadores han sido notificados'
        gameStatus.style.backgroundColor = '#6272a4'
        gameStatus.style.color = '#f8f8f2'
    }

    console.log(data)
}


async function getPlayers() {
    try {
        const playersVisible = playersContainer.style.display !== 'none';
        
        if (playersVisible) {
            playersContainer.style.display = 'none';
            playersButton.textContent = 'Ver Jugadores';
            return;
        }
        

        playersContainer.style.display = 'block';
        playersButton.textContent = 'Ocultar Jugadores';
        

        const response = await fetch('/players');
        const players = await response.json();
        
        if (players.length === 0) {
            playersList.innerHTML = '<p>No hay jugadores registrados</p>';
            return;
        }
        

        let playersHTML = '';
        for (const player of players) {
            const detailsResponse = await fetch(`/player/${player.id}`);
            const playerDetails = await detailsResponse.json();
            
            const roleClass = playerDetails.role === 'lobo' ? 'role-lobo' : 'role-aldeano';
            const roleName = playerDetails.role === 'lobo' ? 'Lobo' : 'Aldeano';
            
            playersHTML += `
                <div class="player-item">
                    <span>${playerDetails.name}</span>
                    <span class="player-role ${roleClass}">${roleName}</span>
                </div>
            `;
        }
        
        playersList.innerHTML = playersHTML;
        
    } catch (error) {
        console.error('Error al obtener jugadores:', error);
        playersList.innerHTML = '<p>Error al cargar jugadores</p>';
    }
}

dayButton.addEventListener('click', makeDay)
nightButton.addEventListener('click', makeNight)
playersButton.addEventListener('click', getPlayers)