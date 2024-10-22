import express from 'express';
import connect from './connection/connect.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoute from './routes/userRoute.js';
import path from 'path';
import contactsRoutes from './routes/contactRoutes.js';
import setUpSocket from './socket.js';
import messagesRoute from './routes/MessagesRoute.js';
import http from 'http';
import dotenv from "dotenv";
import channelRouter from './routes/ChannelRoute.js';
dotenv.config();

const app = express();
const port = process.env.PORT;
const database_url=process.env.DATABASE_URL;
const frontend_url =process.env.ORIGIN;


app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin:[frontend_url,],
    methods:['GET', 'POST','PUT','PATCH','DELETE'],
    allowedHeaders:['Content-Type', 'Authorization', 'Accept'],
    credentials:true
}));
app.use(express.static(path.resolve("./uploads/")));

connect(database_url).then(()=>console.log("Database connected"))
.catch((error)=>console.log("Can't connect to database"+error));

const server=http.createServer(app);
app.use('/api/auth',userRoute);
app.use('/api/contacts',contactsRoutes);
app.use("/api/messages",messagesRoute);
app.use("/api/channel",channelRouter);

server.listen(port, () => {
console.log(`Chat app listening on port ${port}`);
});


setUpSocket(server);
