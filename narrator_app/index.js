const dayButton = document.getElementById('dayBtn')
const nightButton = document.getElementById('nightBtn')
const gameStatus = document.getElementById('game-status')

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

dayButton.addEventListener('click', makeDay)
nightButton.addEventListener('click', makeNight)