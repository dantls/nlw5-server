import express from "express";
import {createServer} from 'http';
import {Server, Socket} from 'socket.io';
import path from 'path';

import 'reflect-metadata';

import cors from 'cors';

import { routes } from "./routes";

import "./database";

const app = express();

app.use(express.static(path.resolve(__dirname, 'public')));
app.set("views", path.resolve(__dirname, 'public'));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/pages/client", (request, response)=>{
  return response.render("html/client.html")
})
app.get("/pages/admin", (request, response)=>{
  return response.render("html/admin.html")
})

const http = createServer(app); //Separando o protocolo http do express
const io = new Server(http) //iniciando um servidor do protocolo do web socket

io.on("connection", (socket: Socket) => {
  console.log("Se conectou",socket.id)
})

app.use(cors());
app.use(express.json());

app.use(routes);

export {http, io}