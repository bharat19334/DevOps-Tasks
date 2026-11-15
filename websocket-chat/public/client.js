// ===== 1. HTML ke elements pakdo =====
const messagesDiv = document.getElementById("messages");
const form = document.getElementById("chat-form");
const input = document.getElementById("message-input");
const statusDiv = document.getElementById("status");

// ===== 2. User ka naam poocho =====
const myName = prompt("Apna naam likho:") || "Guest";

// ===== 3. WebSocket connection kholo =====
// location.host = jis address se page khula hai (localhost:3000)
const socket = new WebSocket("ws://" + location.host);

// Connection ban gaya
socket.onopen = () => {
  statusDiv.textContent = "Connected (" + myName + ")";
  statusDiv.className = "online";
};

// Connection band ho gaya
socket.onclose = () => {
  statusDiv.textContent = "Disconnected. Page refresh karo.";
  statusDiv.className = "offline";
};

// ===== 4. Server se message aaya =====
socket.onmessage = (event) => {
  const msg = JSON.parse(event.data);   // text -> object

  const div = document.createElement("div");

  if (msg.type === "system") {
    div.className = "msg system";
    div.textContent = msg.text;
  } else {
    // agar naam mera hai to "me" (right side), warna "other" (left side)
    div.className = "msg " + (msg.name === myName ? "me" : "other");

    const small = document.createElement("small");
    small.textContent = msg.name + " | " + msg.time;

    const text = document.createElement("span");
    text.textContent = msg.text;   // textContent safe hai (HTML inject nahi hoga)

    div.appendChild(small);
    div.appendChild(text);
  }

  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;  // neeche tak scroll karo
};

// ===== 5. Send button dabaya =====
form.addEventListener("submit", (e) => {
  e.preventDefault();                   // page refresh mat hone do
  const text = input.value.trim();
  if (text === "" || socket.readyState !== WebSocket.OPEN) return;

  socket.send(JSON.stringify({ name: myName, text: text }));  // server ko bhejo
  input.value = "";                     // box khaali karo
});