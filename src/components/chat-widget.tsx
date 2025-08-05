import "@sendbird/uikit-react/dist/index.css";
import "../styles/index.css";

import React from "react";

import { useChatWidget } from "../hooks/use-chat-widget";
import type { ChatWidgetProps } from "../types";
import { Chat } from "./chat";
import { ChatList } from "./chat-list";
import { FloatingChat } from "./floating-chat";
import { GroupChannelProvider } from "@sendbird/uikit-react/GroupChannel/context";
import { X } from "lucide-react";
import { Tooltip } from "react-tooltip";

export const ChatWidget: React.FC<ChatWidgetProps> = ({ onClose }) => {
  const {
    maximizedChannels,
    minimizedChannels,
    handleSelection,
    handleCloseChat,
    handleMinimizeChat,
    handleCloseAllChats,
  } = useChatWidget();

  const minimizedCount = minimizedChannels.length;

  return (
    <div className="flex flex-row h-screen">
      <ChatList onChannelSelect={handleSelection} onClose={onClose} />

      <div className="flex-1 p-4 flex flex-wrap gap-4 overflow-auto w-full">
        {maximizedChannels.map((entry, index) => (
          <Chat
            key={entry.key}
            index={minimizedCount ? index + 0.5 : index}
            channelUrl={entry.url}
            onCloseChat={() => handleCloseChat(entry.url)}
            onMinimizeChat={() => handleMinimizeChat(entry.url)}
          />
        ))}
      </div>

      <div className="fixed bottom-10 right-6 flex flex-col gap-4 items-center">
        {minimizedChannels.length > 1 ? (
          <>
            <div
              data-tooltip-id="close-chats"
              className="bg-gray-200 h-8 w-8 relative cursor-pointer rounded-full justify-center items-center flex p-1 transition delay-50 duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-100 "
              onClick={handleCloseAllChats}
            >
              <X className="h-6 w-6" color="black" />
            </div>
            <Tooltip
              id="close-chats"
              place="left"
              className="bg-white"
              variant="light"
              content="Close all chats"
            />
          </>
        ) : null}
        {minimizedChannels.map((entry) => (
          <GroupChannelProvider channelUrl={entry.url} disableMarkAsRead>
            <FloatingChat key={entry.key} channelUrl={entry.url} />
          </GroupChannelProvider>
        ))}
      </div>
    </div>
  );
};
