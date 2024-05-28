// src/index.js
import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
dotenv.config();

import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})


const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

app.get("/completion", async (req: Request, res: Response) => {
    const completion = await openai.chat.completions.create({
        messages: [{role: "system", content: "You are a helpful assistant."}],
        model: "gpt-3.5-turbo",
    });
    console.log(completion.choices[0]);
    res.send(JSON.stringify(completion, null, 2));
})

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
