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
app.use("/auth", express.static(path.join(__dirname, "auth")))

let players = [];

app.post("/join-game", (req, res) => {
  const {name} = req.body

  if(!name) {
    return res.status(400).json({error: 'Name is required'})
  }

  try {
    console.log(name)
    players.push({name})
    res.json({status: 'success', message: 'Has entrado al juego'})
    console.log(players)

    if(players.length > 4) {
      return res.status(400).json({error: 'hay mas de 4 usuarios registrados'})      
    }

  } catch (error) {
    return res.status(400).json({error: error.message})
  }
  
});




app.post("/notificar-dia", (req, res) => {
  const {message} = req.body

  io.emit('notificar-dia', {message})

  res.json({status: 'success', message: 'Event sent successfully'})
});

app.post("/notificar-noche", (req, res) => {
  const {message} = req.body

  io.emit('notificar-noche', {message})

  res.json({status: 'success', message: 'Event sent successfully'})
});

httpServer.listen(5050);
