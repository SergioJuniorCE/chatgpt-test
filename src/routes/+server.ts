import { json } from "@sveltejs/kit";
import { Configuration, OpenAIApi, type ChatCompletionResponseMessage } from "openai";
import type { RequestHandler } from "./$types";

const configuration = new Configuration({
  apiKey: "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"
})

const openai = new OpenAIApi(configuration)

export const POST = (async ({ request }) => {

  const { messages } = await request.json();
  console.log(messages)
  let chatGPT = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages
  })

  const chatGPTMessage: ChatCompletionResponseMessage | undefined = chatGPT.data.choices[0].message;

  if (!chatGPTMessage) {
    return json({
      chatGPTMessage: {
        role: "assistant",
        content: "Error creating chat message."
      }
    })
  }

  console.log(chatGPTMessage)

  return json({
    chatGPTMessage
  })
}) satisfies RequestHandler;