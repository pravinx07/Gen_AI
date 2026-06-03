import {GoogleGenAI} from "@google/genai"
import readline from "readline"
import dotenv from "dotenv"

dotenv.config();

const ai = new GoogleGenAI({
    apiKey:process.env.GOOGLE_API_KEY
})


const rl = readline.createInterface({
    input: process.stdin,
    output:process.stdout
})

// chat history
const messages: string[] = []


async function aksQuestion() {
    rl.question("You:", async(userInput) => {
        if(userInput.toLowerCase() === "exit"){
            console.log("Chat ended");
            rl.close();
            return;
            
        }

        try {
            messages.push(`User: ${userInput}`);

            const res = await ai.models.generateContent({
                model:"gemini-3.5-flash",
                contents:messages.join("/n")
                
            })
            console.log("\nAI:", res.text);

            // save ai response in memory 
            messages.push(`AI: ${res.text}`);
            aksQuestion();
            
        } catch (error) {
            console.log("Error",error);
            rl.close();
        }
    }
)
    
}

console.log("AI chat Started (type 'exit' to quit)");
aksQuestion();
