const socket = io("http://localhost:5050", { path: "/rea-time" });

const body = document.getElementById('body')

socket.on("notificar-dia", (data) => {
  console.log('evento día', data)
  body.style.backgroundColor = 'cyan'
});

socket.on("notificar-noche", (data) => {
  console.log('evento noche', data)
  body.style.backgroundColor = 'gray'
});
