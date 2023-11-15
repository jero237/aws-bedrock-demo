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

export const sendLamaPrompt = async (prompt: string) => {
  const request = {
    prompt: `This is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly. You will answer to this message: [${prompt}]`,
    max_gen_len: 100,
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
    )
    console.log(completition)
    return completition;
  } catch (err) {
    console.log("Error", err);
    return null;
  }
};
