export type ChatMessage = {
  role: "system" | "assistant" | "user";
  content: string;
}
