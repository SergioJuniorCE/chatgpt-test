import { SECRET_OPENAI_KEY } from "$env/static/private";
import { json } from "@sveltejs/kit";
import { Configuration, OpenAIApi } from "openai";
import type { RequestHandler } from "./$types";

const configuration = new Configuration({
  apiKey: SECRET_OPENAI_KEY,
})

const openai = new OpenAIApi(configuration)

export const POST = (async ({ request }) => {

  const { messages } = await request.json();
  let chatGPT = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages
  })

  const chatGPTMessage = chatGPT.data.choices[0].message;

  return json(
    chatGPTMessage
  )
}) satisfies RequestHandler;