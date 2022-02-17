import express from "express";
import * as http from "http";
import * as WebSocket from "ws";
import { AddressInfo } from "net";

import { PORT } from "./const";
import { makeDummyPackage } from "./func";

import Timer = NodeJS.Timer;

const app = express();

// initialize a simple http server
const server = http.createServer(app);

// initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

let timer: Timer;

wss.on("connection", (ws: WebSocket) => {
  const txLimit = 5;
  let counter = 999;

  console.log("Connection established");

  timer = setInterval(() => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const randTXCount = Math.floor(Math.random() * txLimit + 1);

      const pkg = makeDummyPackage(counter, randTXCount);
      console.log("pkg", pkg);

      ws.send(JSON.stringify(pkg));

      counter += randTXCount;
    } else {
      clearInterval(timer);
    }
  }, 3000); // Every 3 seconds
});

// start our server
server.listen(PORT, () => {
  console.log(
    `Server started on port ${(server.address() as AddressInfo).port} :)`
  );
});
