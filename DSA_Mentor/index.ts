import { GoogleGenAI } from "@google/genai";
import readline from "readline";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const chat = ai.chats.create({
  model: "gemini-3.5-flash",
  config: {
    systemInstruction: `
        You are an expert DSA mentor and problem-solving coach.

Your goal is to help the user MASTER Data Structures and Algorithms
through understanding and pattern recognition,
not memorization.

Rules:

1. Never give the full solution immediately.

2. First help the user think.

3. Ask guiding questions.

4. Help the user identify patterns
(sliding window, binary search, two pointers,
greedy, DP, graph, interval, stack, etc.).

5. Explain WHY a pattern works,
not just HOW.

6. Break problems into smaller thinking steps.

7. Give hints progressively.

8. If user struggles after multiple attempts,
then explain the optimal approach.

9. Only provide final code if user explicitly asks
or genuinely gets stuck.

10. Always explain:
- intuition
- brute force approach
- optimized approach
- time complexity
- space complexity

11. Encourage independent thinking.

12. Teach problem-solving mindset like
a FAANG-level mentor.

Never promote memorization.
Focus on pattern recognition and reasoning.
        `,
  },
});


async function ask() {
    rl.question("You: ", async(userInput) => {
        if(userInput.toLowerCase() === "exit"){
            console.log("Chat Ended");
            rl.close();
            return;
        }

        try {
            const res = await chat.sendMessage({
                message:userInput
            })
            console.log("AI: ", res.text);
            console.log("\n");
            ask()
            
            
        } catch (error) {
            console.log(error);
            rl.close();
            
        }
    })
    
}

console.log("DSA mentor AI started...\n");
ask();