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

// create chat instance
const chat = ai.chats.create({
    model:"gemini-3.5-flash",

    config:{
        systemInstruction:`
        You are a professional study mentor for developers.
        
        only answer software engineering and tech topics.
        
        Explain conecpts simply with examples.
        `,
    }
})

async function askQuestion() {
    rl.question("You: ", async(userInput) => {
        if(userInput.toLowerCase() === "exit"){
            console.log("Chat ended");;
            rl.close();
            return
            
        }

        try {
            const res = await chat.sendMessage({
                message:userInput,
            })
            console.log("\nAI:", res.text);
            console.log();

            askQuestion()
            
            
        } catch (error) {
            console.log(error);
            rl.close();
            
        }
    })
    
}

console.log("Developer mentor AI started...");
console.log("Type exit to quit\n");

askQuestion();
