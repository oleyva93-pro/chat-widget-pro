import { createContext } from "react";
import type { ChatHistoryProps } from "../types";

export const ChatHistoryContext = createContext<ChatHistoryProps>({
  externalHistoryUrl: "",
  externalToken: () => "",
});
