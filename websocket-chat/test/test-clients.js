// Ye script 3 fake clients (Asha, Bharat, Chetan) banati hai aur check karti hai
// ki ek ka message baaki sabko mila ya nahi.

const WebSocket = require("ws");

const URL = "ws://localhost:3000";
const names = ["Asha", "Bharat", "Chetan"];
const received = {};              // har client ko kaun-kaun se chat messages mile
let passed = true;

// ---- Ek client banane ka helper ----
function createClient(name) {
  return new Promise((resolve) => {
    const ws = new WebSocket(URL);
    received[name] = [];

    ws.on("open", () => resolve(ws));        // connect hote hi ready

    ws.on("message", (data) => {
      const msg = JSON.parse(data.toString());
      if (msg.type === "chat") {             // system messages ignore karo
        received[name].push(msg.name + ": " + msg.text);
      }
    });
  });
}

// ---- thoda wait karne ka helper ----
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function runTest() {
  console.log("1) Three clients connecting...");
  const clients = [];
  for (const n of names) clients.push(await createClient(n));
  console.log("   Connected:", names.join(", "));

  console.log("2) Asha 'Hello everyone!' bhejti hai...");
  clients[0].send(JSON.stringify({ name: "Asha", text: "Hello everyone!" }));
  await wait(300);

  console.log("3) Bharat 'Hi Asha!' bhejta hai...");
  clients[1].send(JSON.stringify({ name: "Bharat", text: "Hi Asha!" }));
  await wait(300);

  // ---- Result check ----
  console.log("\n4) Result:");
  const expected = ["Asha: Hello everyone!", "Bharat: Hi Asha!"];

  for (const n of names) {
    const ok = JSON.stringify(received[n]) === JSON.stringify(expected);
    console.log("   " + n + " ko mila:", received[n], ok ? "PASS" : "FAIL");
    if (!ok) passed = false;
  }

  clients.forEach((c) => c.close());
  console.log(passed ? "\nSAB TEST PASS HUE" : "\nKUCH TEST FAIL HUA");
  process.exit(passed ? 0 : 1);
}

runTest();