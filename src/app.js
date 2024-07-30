import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import viewsRouter from "./routes/view.router.js";
import { Server } from "socket.io";

const app = express();
const PORT = 8080;
const arrayMsg = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public")); // Importante para tener archivos html y css

// --------------- LADO DEL SERVIDOR -----------------

app.use("/", viewsRouter);

// Inicializamos el puerto (Esto reemplaza el Listen)
const httpServer = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
// En esta linea instanciamos la clase Server (inicializamos)
const socketServer = new Server(httpServer);

// SocketServer.on nos facilita la conexion con el lado del cliente.
socketServer.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  socket.on("chat", (msg) => {
    arrayMsg.push({ mensaje: msg });
    console.log(arrayMsg);
    socketServer.emit("chat", msg);
  });
});
