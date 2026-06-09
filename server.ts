import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

const app = express();
app.use(express.json());

interface Room {
  code: string;
  cols: any[];
  rows: any[];
  answers: any[][];
  answeredBy: any[][];
  player1Name: string;
  player2Name: string;
  player1Active: boolean;
  player2Active: boolean;
  currentTurn: 1 | 2;
  status: 'waiting' | 'playing' | 'gameover';
  rarityScores: { p1: number; p2: number };
  gameMode: 'duo';
  p1Lives?: number;
  p2Lives?: number;
  createdAt: number;
}

const rooms: Record<string, Room> = {};

// Clean stale rooms (older than 2 hours) every 30 minutes
setInterval(() => {
  const now = Date.now();
  Object.keys(rooms).forEach(code => {
    if (now - rooms[code].createdAt > 2 * 60 * 60 * 1000) {
      delete rooms[code];
    }
  });
}, 30 * 60 * 1000);

// API routes FIRST
app.post("/api/rooms", (req, res) => {
  try {
    const { cols, rows, player1Name } = req.body;
    
    // Generate a random 4-letter alphanumeric uppercase code
    let code = "";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    // Ensure uniqueness
    let attempts = 0;
    while (rooms[code] && attempts < 100) {
      code = "";
      for (let i = 0; i < 4; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      attempts++;
    }

    rooms[code] = {
      code,
      cols,
      rows,
      answers: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ],
      answeredBy: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ],
      player1Name: player1Name || "מארח",
      player2Name: "",
      player1Active: true,
      player2Active: false,
      currentTurn: 1,
      status: 'waiting',
      rarityScores: { p1: 0, p2: 0 },
      gameMode: 'duo',
      p1Lives: 3,
      p2Lives: 3,
      createdAt: Date.now()
    };

    res.json(rooms[code]);
  } catch (error) {
    res.status(500).json({ error: "Failed to create room" });
  }
});

app.get("/api/rooms/:code", (req, res) => {
  const code = req.params.code?.toUpperCase();
  const room = rooms[code];
  if (!room) {
    return res.status(404).json({ error: "Room not found" });
  }
  res.json(room);
});

app.post("/api/rooms/:code/join", (req, res) => {
  const code = req.params.code?.toUpperCase();
  const { playerName } = req.body;
  const room = rooms[code];
  if (!room) {
    return res.status(404).json({ error: "Room not found" });
  }

  // If player 1 is joining
  if (room.player1Name === playerName) {
    room.player1Active = true;
    return res.json({ role: 1, room });
  }

  // If player 2 is not set yet
  if (!room.player2Name) {
    room.player2Name = playerName || "אורח";
    room.player2Active = true;
    room.status = 'playing'; // Automatically start when guest joins
    return res.json({ role: 2, room });
  }

  // If already full, verify if player 2 is reconnecting
  if (room.player2Name === playerName) {
    room.player2Active = true;
    return res.json({ role: 2, room });
  }

  return res.status(400).json({ error: "Room is full" });
});

app.post("/api/rooms/:code/move", (req, res) => {
  const code = req.params.code?.toUpperCase();
  const { answers, answeredBy, currentTurn, rarityScores, status, p1Lives, p2Lives } = req.body;
  const room = rooms[code];
  if (!room) {
    return res.status(404).json({ error: "Room not found" });
  }

  room.answers = answers;
  room.answeredBy = answeredBy;
  room.currentTurn = currentTurn;
  room.rarityScores = rarityScores;
  if (p1Lives !== undefined) room.p1Lives = p1Lives;
  if (p2Lives !== undefined) room.p2Lives = p2Lives;
  if (status) {
    room.status = status;
  }

  res.json(room);
});

app.post("/api/rooms/:code/reset", (req, res) => {
  const code = req.params.code?.toUpperCase();
  const { cols, rows } = req.body;
  const room = rooms[code];
  if (!room) {
    return res.status(404).json({ error: "Room not found" });
  }

  room.cols = cols;
  room.rows = rows;
  room.answers = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  room.answeredBy = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  room.currentTurn = 1;
  room.status = 'playing';
  room.rarityScores = { p1: 0, p2: 0 };
  room.p1Lives = 3;
  room.p2Lives = 3;
  
  res.json(room);
});

// Vite middleware flow for development & asset serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const PORT = 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
