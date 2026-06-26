const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // update with frontend origin for production
    methods: ["GET", "POST"],
  },
});

// Map userId -> socketId
const userToSocketMap = new Map();

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  const userId = socket.handshake.query.userId;
  if (!userId) {
    console.error("❌ User ID is required for socket connection");
    socket.disconnect();
    return;
  }

  // Save mapping
  userToSocketMap.set(userId, socket.id);
  console.log(`✅ User ${userId} connected with socket ID ${socket.id}`);

  socket.on("call", (message) => {
    console.log("📩 Message received at server:", message);

    const targetSocket = userToSocketMap.get(message.to);
    if (!targetSocket) {
      console.warn(`⚠️ User ${message.to} not found or offline`);
      return;
    }

    // Relay signaling messages to the correct user
    if (message.type === "createOffer") {
      console.log("➡️ Forwarding offer to receiver:", message.to);
      io.to(targetSocket).emit("call", {
        type: "createOffer",
        sdp: message.sdp,
        from: userId,
      });
    } else if (message.type === "createAnswer") {
      console.log("➡️ Forwarding answer to sender:", message.to);
      io.to(targetSocket).emit("call", {
        type: "createAnswer",
        sdp: message.sdp,
        from: userId,
      });
    } else if (message.type === "iceCandidate") {
      console.log("➡️ Forwarding ICE candidate to:", message.to);
      io.to(targetSocket).emit("call", {
        type: "iceCandidate",
        candidate: message.candidate,
        from: userId,
      });
    } else if (message.type === "rejectCall") {
      console.log("❌ Call rejected by:", userId);
      io.to(targetSocket).emit("call", { type: "rejectCall", from: userId });
    }
  });

  socket.on("disconnect", () => {
    console.log(`❌ User ${userId} disconnected (${socket.id})`);
    userToSocketMap.delete(userId);
  });
});

module.exports = { app, server, io, userToSocketMap };
