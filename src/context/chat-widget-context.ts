import { createContext } from "react";
import type { ChatWidgetContextType } from "../types";

export const ChatWidgetContext = createContext<
  ChatWidgetContextType | undefined
>(undefined);
