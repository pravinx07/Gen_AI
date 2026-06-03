import { GoogleGenAI } from "@google/genai";
import readline from "readline"
import dotenv from "dotenv"
dotenv.config();
const ai = new GoogleGenAI({
    apiKey:process.env.GOOGLE_API_KEY
})

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
async function main() {
    rl.question("Ask something:" , async(userInput) => {

        try {
            const response = await ai.models.generateContent({
                model:"gemini-2.5-flash",
                contents: userInput,
            })
            console.log("\nAI Response:");
            
            console.log(response.text);
            
        } catch (error) {
            console.error("Error",error)
        }finally{
            rl.close();
        }
        
    })
}

await main();