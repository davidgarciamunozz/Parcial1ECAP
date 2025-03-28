// Configuración del socket io
const socket = io("http://localhost:5050", { path: "/rea-time" });
const body = document.getElementById('body');

// Elementos DOM para mostrar información del jugador
const playerNameElement = document.getElementById('player-name');
const playerRoleElement = document.getElementById('player-role');
const narratorTextElement = document.getElementById('narrator-text');

// Obtener información del jugador desde localStorage
const playerName = localStorage.getItem('playerName');
const playerRole = localStorage.getItem('playerRole');

// Verificar si hay información del jugador
if (!playerName || !playerRole) {
    // Redirigir al registro si no hay datos del jugador
    window.location.href = '/auth';
} else {
    // Mostrar la información del jugador
    playerNameElement.textContent = playerName;
    
    if (playerRole === 'lobo') {
        playerRoleElement.textContent = 'Lobo';
        playerRoleElement.classList.add('role-lobo');
    } else {
        playerRoleElement.textContent = 'Aldeano';
        playerRoleElement.classList.add('role-aldeano');
    }
}

// Escuchar eventos de día
socket.on("notificar-dia", (data) => {
  console.log('evento día', data);
  body.style.backgroundColor = 'cyan';
  
  // Mostrar el mensaje del narrador
  narratorTextElement.textContent = data.message || 'Narrador ha dicho: ¡Es de día!';
  narratorTextElement.style.backgroundColor = '#e6f7ff';
  narratorTextElement.style.color = '#0066cc';
});

// Escuchar eventos de noche
socket.on("notificar-noche", (data) => {
  console.log('evento noche', data);
  body.style.backgroundColor = 'gray';
  
  // Mostrar el mensaje del narrador
  narratorTextElement.textContent = data.message || 'Narrador ha dicho: ¡Es de noche!';
  narratorTextElement.style.backgroundColor = '#333';
  narratorTextElement.style.color = '#fff';
});