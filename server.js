const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
var users={};
io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("send-location", (data) => {
       users[data.user]=data;
       console.log("users ",users);
       io.emit("location-updated",users);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected",socket.handshake.query.userId);
        var userId=socket.handshake.query.userId;
        delete obj[userId]
        io.emit("location-updated",users);
    });
});

app.get("/ClearUsers", (req, res) => {
    users = {}; 
    io.emit("location-updated",users);
    res.json({ message: "All users cleared",status:true });
});


server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});