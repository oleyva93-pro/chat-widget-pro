import { createContext } from "react";
import type { ChatWidgetState } from "../types";

export interface ChatWidgetContextType {
  state: ChatWidgetState;
  toggleChat: () => void;
  selectChannel: (channel: any) => void;
  updateUnreadCount: (count: number) => void;
  setConnected: (connected: boolean) => void;
}

export const ChatWidgetContext = createContext<
  ChatWidgetContextType | undefined
>(undefined);
