import express from "express";
import {createServer} from 'http';
import {Server, Socket} from 'socket.io';

import 'reflect-metadata';

import cors from 'cors';

import { routes } from "./routes";

import "./database";


const app = express();

const http = createServer(app); //Separando o protocolo http do express
const io = new Server(http) //iniciando um servidor do protocolo do web socket

io.on("connection", (socket: Socket) => {
  console.log("Se conectou",socket.id)
})

app.use(cors());
app.use(express.json());

app.use(routes);


http.listen(3333, ()=> {
  console.log("Server is running on port 3333");
})