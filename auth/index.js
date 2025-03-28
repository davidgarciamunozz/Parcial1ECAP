const enterBtn = document.getElementById('playBtn')

async function enterGame () {
    
    const nameInput = document.getElementById('name-input')
    const name = nameInput.value
    const res = await fetch('/join-game', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({name})
    })

    if (res.status === 200) {
        console.log('has entrado al juego')
        console.log(name)
    }

    const data = await res.json()

    console.log(data)
}


enterBtn.addEventListener('click', enterGame)
