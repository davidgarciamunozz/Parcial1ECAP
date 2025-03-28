const dayButton = document.getElementById('dayBtn')
const nightButton = document.getElementById('nightBtn')

async function makeDay() {
    const res = await fetch('/notificar-dia', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({message: 'evento dia desde el narrador'})
    })

    const data = await res.json()

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

    console.log(data)
}

dayButton.addEventListener('click', makeDay)
nightButton.addEventListener('click', makeNight)


