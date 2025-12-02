import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Initialize Gemini
// NOTE: You need to provide a valid API key in your .env file as GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'PLACEHOLDER_KEY');

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

router.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!process.env.GEMINI_API_KEY) {
            // Fallback for when no key is present
            return res.json({
                reply: "I'm currently in demo mode! To make me really smart, please add a GEMINI_API_KEY to the server configuration. For now, I recommend the Caramel Macchiato!"
            });
        }

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: "You are a cheerful, helpful coffee shop assistant for 'CoffeeShopOS'. You help customers choose drinks, explain the menu, and are generally pleasant. Keep answers relatively short and emoji-friendly. The menu includes: Espresso, Cappuccino, Latte, Mocha, Americano, and Macchiato. Prices range from 120-250 INR." }],
                },
                {
                    role: "model",
                    parts: [{ text: "Hi there! 👋 I'm your CoffeeShopOS assistant! I'd love to help you find the perfect brew today. What are you in the mood for? ☕✨" }],
                },
            ],
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });
    } catch (error) {
        console.error('AI Error:', error);
        res.status(500).json({ reply: "Oops! My brain needs a little caffeine reboot. 😵‍💫 (Error connecting to AI)" });
    }
});

export default router;
