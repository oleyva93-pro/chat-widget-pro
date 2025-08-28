import { createRef } from "react";
import type { ChatHistoryHandle, ChatHistoryParams } from '@/types';

export const chatHistoryRef = createRef<ChatHistoryHandle>();

export const openChatHistory = (params?: ChatHistoryParams) => {
  chatHistoryRef.current?.open(params);
};

export const closeChatHistory = () => {
  chatHistoryRef.current?.close();
};
