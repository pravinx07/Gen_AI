import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();



const ai = new GoogleGenAI({apiKey: process.env.GOOGLE_API_KEY})

async function  main() {
    const res = await ai.models.generateContent({
        model:"gemini-3.5-flash",
        contents:"How does AI works"
    })

    console.log(res.text);
    
    
}

await main()