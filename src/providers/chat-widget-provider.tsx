import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import React, { useRef } from "react";
import { ChatWidgetContext } from "../context/chat-widget-context";
import type { ChatWidgetConfig, ChatWidgetProviderProps } from "../types";

export const ChatWidgetProvider: React.FC<ChatWidgetProviderProps> = ({
  children,
  config,
}) => {
  const unReactiveOpenChats = useRef<string[]>([]);

  return (
    <ChatSendbirdProvider config={config}>
      <ChatWidgetContext.Provider
        value={{
          unReactiveOpenChats,
        }}
      >
        {children}
      </ChatWidgetContext.Provider>
    </ChatSendbirdProvider>
  );
};

function ChatSendbirdProvider({
  children,
  config,
}: {
  children: React.ReactNode;
  config: ChatWidgetConfig;
}) {
  return (
    <SendbirdProvider
      appId={config.appId}
      userId={config.userId}
      sdkInitParams={{
        appStateToggleEnabled: false,
      }}
      uikitOptions={{
        groupChannel: {
          enableVoiceMessage: false,
        },
      }}
    >
      {children}
    </SendbirdProvider>
  );
}
