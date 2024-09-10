// src/index.js
import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import IndexController from './controller';
import {responseFormatter} from "./middleware/intercepter";
import logger from "./middleware/logger";

dotenv.config();


const app: Express = express();
const port = process.env.PORT || 3000;


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use(logger);
app.use(responseFormatter);
app.use('/api', IndexController)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});