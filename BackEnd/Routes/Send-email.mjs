import { Client } from '@botpress/chat'
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });
const myWebhookId = "";
const BotRouter = express();

BotRouter = new Client({
  apiUrl: `https://chat.botpress.cloud/${myWebhookId}`,
})

void client.listMessages({}).then(({ messages }) => {
  console.log(messages)
})
EmailRouter.post("/conversation", sendMessage);

export { EmailRouter };