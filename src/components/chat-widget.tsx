import "@sendbird/uikit-react/dist/index.css";
import "../styles/index.css";

import React from "react";

import { useChatWidget } from "../hooks/use-chat-widget";
import type { ChatWidgetProps } from "../types";
import { Chat } from "./chat";
import { ChatList } from "./chat-list";

export const ChatWidget: React.FC<ChatWidgetProps> = ({ onClose }) => {
  const { channels, handleSelection, handleCloseChat, handleMinimizeChat } =
    useChatWidget();

  return (
    <div className="flex flex-row h-screen">
      <ChatList onChannelSelect={handleSelection} onClose={onClose} />

      <div className="flex-1 p-4 flex flex-wrap gap-4 overflow-auto w-full">
        {channels.map((entry, index) => (
          <Chat
            key={entry.key}
            index={index}
            channelUrl={entry.url}
            onCloseChat={() => handleCloseChat(entry.url)}
            onMinimizeChat={() => handleMinimizeChat(entry.url)}
            minimized={entry.minimized}
          />
        ))}
      </div>
    </div>
  );
};
