// ------------------------ LADO CLIENTE -----------------------
// En este linea lo que hacemos es levantar Socket del lado del CLIENTE
const socket = io();

const form = document.querySelector("form");
const input = document.querySelector("input");
let cajaMensajes = document.querySelector("ul");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input.value) {
    socket.emit("chat", input.value);
    input.value = "";
  }
});

socket.on("chat", (msg) => {
  let item = document.createElement("li");
  item.className = "texting";
  item.innerHTML = msg;
  cajaMensajes.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
