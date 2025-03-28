const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const { createServer } = require("http");

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  path: "/rea-time",
  cors: {
    origin: "*",
  },
});

app.use(express.json());
app.use("/player-app", express.static(path.join(__dirname, "player_app")));
app.use("/narrator-app", express.static(path.join(__dirname, "narrator_app")));
app.use("/auth", express.static(path.join(__dirname, "auth")));


const roles = ['lobo', 'aldeano', 'aldeano', 'aldeano'];


let players = [];

app.post("/join-game", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {

    if (players.length >= 4) {
      return res.status(400).json({ error: 'El juego está lleno (máximo 4 jugadores)' });
    }


    const randomIndex = Math.floor(Math.random() * roles.length);
    const role = roles.splice(randomIndex, 1)[0]; 

    const newPlayer = { 
      id: players.length + 1,
      name,
      role 
    };
    
    players.push(newPlayer);
    
    console.log(`Jugador ${name} se ha unido como ${role}`);
    console.log(`Jugadores actuales: ${players.length}`);


    res.json({
      status: 'success',
      message: 'Has entrado al juego',
      role: role,
      redirect: '/player-app',
      playerId: newPlayer.id
    });

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});


app.get("/players", (req, res) => {
  const publicPlayers = players.map(player => ({
    id: player.id,
    name: player.name
  }));
  
  res.json(publicPlayers);
});


app.get("/player/:id", (req, res) => {
  const playerId = parseInt(req.params.id);
  const player = players.find(p => p.id === playerId);
  
  if (!player) {
    return res.status(404).json({ error: 'Jugador no encontrado' });
  }
  
  res.json(player);
});


app.post("/reset-game", (req, res) => {
  players = [];

  roles.length = 0;
  roles.push('lobo', 'aldeano', 'aldeano', 'aldeano');
  
  res.json({ status: 'success', message: 'Juego reiniciado' });
});

app.post("/notificar-dia", (req, res) => {
  const { message } = req.body;
  io.emit('notificar-dia', { message });
  res.json({ status: 'success', message: 'Event sent successfully' });
});

app.post("/notificar-noche", (req, res) => {
  const { message } = req.body;
  io.emit('notificar-noche', { message });
  res.json({ status: 'success', message: 'Event sent successfully' });
});

httpServer.listen(5050, () => {
  console.log('Servidor iniciado en el puerto 5050');
});