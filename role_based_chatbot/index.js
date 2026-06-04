import { GoogleGenAI } from "@google/genai";
import readline from "readline"
import dotenv from "dotenv"
import { log } from "console";

dotenv.config();


const ai = new GoogleGenAI({
    apiKey:process.env.GOOGLE_API_KEY
})

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

// role /system prompt

const systemPrompt = `
You are a professional study mentor for software developers.
only answer technology and software engineering topics.
explain concepts in simple langauge with beginner-friendly examples.
keep answers short and practical.`;


const chatHistory = [];

async function chatWithAi(){
    rl.question("You: ", async(userInput) => {
        if(userInput.toLowerCase() === "exit"){
            console.log("Chat ended");

            rl.close();
            return;
        }

        try {
            chatHistory.push(`User: ${userInput}`);

            const res = await ai.models.generateContent({
                model:"gemini-3.5-flash",
                contents:chatHistory.join("\n"),
                config:{
                    systemInstruction:systemPrompt
                }
            })

            console.log("\nAI:", res.text);

            // save ai response

            chatHistory.push(`AI: ${res.text}`);
            chatWithAi();
            
        } catch (error) {
            console.error("Error: ",error);
            rl.close();
        }
    })
}

console.log("Developer Mentor AI started...");
console.log("Type 'exit' to quit\n");

chatWithAi();
