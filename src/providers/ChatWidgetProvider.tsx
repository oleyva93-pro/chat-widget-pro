import React, { useState, useCallback } from "react";
import type { ChatWidgetProviderProps, ChatWidgetState } from "../types";
import { ChatWidgetContext } from "../context/ChatWidgetContext";

export const ChatWidgetProvider: React.FC<ChatWidgetProviderProps> = ({
  children,
  isOpen = false,
  onChannelChanged,
}) => {
  const [state, setState] = useState<ChatWidgetState>({
    isOpen,
    selectedChannel: null,
    unreadCount: 0,
    isConnected: false,
  });

  const toggleChat = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  }, []);

  const selectChannel = useCallback(
    (channel: unknown) => {
      setState((prev) => ({ ...prev, selectedChannel: channel }));
      onChannelChanged?.(channel);
    },
    [onChannelChanged]
  );

  const updateUnreadCount = useCallback((count: number) => {
    setState((prev) => ({ ...prev, unreadCount: count }));
  }, []);

  const setConnected = useCallback((connected: boolean) => {
    setState((prev) => ({ ...prev, isConnected: connected }));
  }, []);

  const contextValue = {
    state,
    toggleChat,
    selectChannel,
    updateUnreadCount,
    setConnected,
  };

  return (
    <ChatWidgetContext.Provider value={contextValue}>
      {children}
    </ChatWidgetContext.Provider>
  );
};
