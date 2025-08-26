import { useContext } from "react";
import { ChatHistoryContext } from "../context/chat-history-context";

export function useChatHistoryContext() {
  const context = useContext(ChatHistoryContext);

  if (!context) {
    throw new Error("useChatHistoryContext must be used within a ChatHistory");
  }

  return context;
}
