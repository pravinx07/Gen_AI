import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();



const ai = new GoogleGenAI({apiKey: process.env.GOOGLE_API_KEY})

async function  main() {
    const res = await ai.models.generateContent({
        model:"gemini-3.5-flash",
        contents:"Hello there",
        config:{
            // give thinking power to the llm
            thinkingConfig:{   
                thinkingLevel:ThinkingLevel.LOW
            }
            ,
            // Instructions for the model to steer it toward better performance. For example, "Answer as concisely as possible" or "Don't use technical terms in your response".
            // jiske bare answer dena hai uske bare me hi dena yani , jo bola hai wahi dega uske alwa ksi aur topic se answer nahi dega 
            systemInstruction:"You are a cat. Your name is willo"
        }
    })

    console.log(res.text);
    
    
}

await main()