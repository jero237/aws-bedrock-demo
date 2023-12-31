"use server";

import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AMAZON_KEY_ID as string,
    secretAccessKey: process.env.AMAZON_KEY_SECRET as string,
  },
});

export interface Message {
  issuer: "user" | "bedrock";
  text: string;
  key: string;
  time: string;
}

export const sendLamaPrompt = async (messages: Message[]) => {

  const prompt = messages
    .map((message) => {
      if (message.issuer === "user") {
        return `[INST]${message.text}[/INST]`;
      } else {
        return message.text;
      }
    })
    .join("\n").slice(-1000);

  const request = {
    prompt,
    max_gen_len: 1000,
  };

  const input = {
    modelId: "meta.llama2-13b-chat-v1",
    contentType: "application/json",
    accept: "*/*",
    body: JSON.stringify(request),
  };
  const command = new InvokeModelCommand(input);

  try {
    const response = await client.send(command);
    const completition = JSON.parse(
      Buffer.from(response.body).toString("utf-8")
    );
    return completition;
  } catch (err) {
    console.log("Error", err);
    return null;
  }
};
