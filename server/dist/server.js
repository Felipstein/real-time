"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/app.ts
var import_node_http = __toESM(require("http"));
var import_express = __toESM(require("express"));
var import_socket = require("socket.io");
var import_cors = __toESM(require("cors"));
var app = (0, import_express.default)();
var server = import_node_http.default.createServer(app);
var io = new import_socket.Server(server, { cors: { origin: "*" } });
app.use(import_express.default.json());
app.use((0, import_cors.default)());
var users = [];
io.on("connection", (socket) => {
  socket.on("client@connected", (username) => {
    users.push({ username });
    socket.emit("users@updated", users);
  });
  socket.on("client@disconnected", (username) => {
    users = users.filter((user) => user.username !== username);
    socket.emit("users@updated", users);
  });
  socket.on("cursor-client@move", (cursorUpdated) => {
    users = users.map(
      (user) => user.username === cursorUpdated.username ? cursorUpdated : user
    );
    console.log(cursorUpdated);
    socket.emit("users@updated", users);
  });
});

// src/server.ts
console.log("\x1B[2J\x1B[0f");
server.listen(3333, () => console.info("Server is running."));
