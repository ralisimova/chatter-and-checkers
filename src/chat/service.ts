import { Message } from "../types/message";
import { CHAT_API_URL, MODEL_NAME } from "./constants";
import { GENERAL_PROMPT, ASK_PROMPT, RECOMMENDATION_PROMPT } from "./prompt";

export class ChatService {
  async sendMessage(allMessages: Message[], mode: string) {
    const response = await fetch(CHAT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [
          {
            role: "system",
            content: GENERAL_PROMPT.concat(
              mode === "ask" ? ASK_PROMPT : RECOMMENDATION_PROMPT
            ),
          },
          ...allMessages,
        ],
      }),
    });

    const data = await response.json();
    return data && data.choices
      ? data.choices[0].message.content
      : "I couldn't get a response from the server. Please try again.";
  }
}

export const chatService = new ChatService();
