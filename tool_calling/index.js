import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
    apiKey:process.env.GOOGLE_API_KEY
});

const groundingTool = {
    googleSearch:{}
}

const config = {
    tools:[groundingTool]
}

const res = await ai.models.generateContent({
    model:"gemini-3.5-flash",
    contents:"Who won IPL 2026",
    config:config
})

console.log(res.text);
