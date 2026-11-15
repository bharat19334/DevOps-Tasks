
// ===== 1. Import Required Packages =====
const express = require("express");
const http = require("http");
const WebSocket = require("ws");

// ===== 2. Create Server =====
const app = express();

app.use(express.static("public"));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// ===== 3. Broadcast Message to All Connected Clients =====
function broadcast(message) {
  wss.clients.forEach((client) => {
    // Send message only if the connection is open
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// ===== 4. Handle New Client Connections =====
wss.on("connection", (socket) => {
  console.log("New client connected. Total online:", wss.clients.size);

  // Notify all clients when a new user joins
  broadcast(JSON.stringify({
    type: "system",
    text: "A new user joined. Online users: " + wss.clients.size,
  }));

  // Handle incoming messages from the client
  socket.on("message", (data) => {
    try {
      const msg = JSON.parse(data.toString());

      console.log("Message received:", msg.name, "->", msg.text);

      // Forward the message to all connected clients
      broadcast(JSON.stringify({
        type: "chat",
        name: msg.name,
        text: msg.text,
        time: new Date().toLocaleTimeString("en-IN"),
      }));

    } catch (err) {
      console.log("Invalid message format. Message ignored.");
    }
  });

  // Handle client disconnection
  socket.on("close", () => {
    console.log("Client disconnected. Total online:", wss.clients.size);

    // Notify all clients when a user leaves
    broadcast(JSON.stringify({
      type: "system",
      text: "A user left the chat. Online users: " + wss.clients.size,
    }));
  });
});

// ===== 5. Start Server =====
const PORT = 3000;

server.listen(PORT, () => {
  console.log("Server is running at: http://localhost:" + PORT);
});
