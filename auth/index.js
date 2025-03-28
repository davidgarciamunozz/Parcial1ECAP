const enterBtn = document.getElementById('playBtn');

async function enterGame(event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    
    const nameInput = document.getElementById('name-input');
    const name = nameInput.value.trim();
    
    if (!name) {
        alert('Por favor, ingresa tu nombre para unirte al juego');
        return;
    }
    
    try {
        const res = await fetch('/join-game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        });
        
        const data = await res.json();
        
        if (res.status === 200) {
            console.log('Has entrado al juego');
            console.log('Tu rol es:', data.role);
            
            // Guardar el ID del jugador y el rol en localStorage
            localStorage.setItem('playerId', data.playerId);
            localStorage.setItem('playerName', name);
            localStorage.setItem('playerRole', data.role);
            
            // Redirigir al jugador a la aplicación de juego
            window.location.href = data.redirect;
        } else {
            // Mostrar mensaje de error
            alert(data.error || 'Error al unirse al juego');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error de conexión al servidor');
    }
}

enterBtn.addEventListener('click', enterGame);