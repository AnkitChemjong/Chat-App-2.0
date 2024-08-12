import express from 'express';
import connect from './connection/connect.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoute from './routes/userRoute.js';
import path from 'path';
import dotenv from "dotenv";
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

app.use('/api/auth',userRoute);
app.listen(port, () => {
console.log(`Chat app listening on port ${port}`);
});
