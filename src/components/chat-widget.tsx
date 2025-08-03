import "@sendbird/uikit-react/dist/index.css";
import React, { useCallback, useState } from "react";

import { useChatWidget } from "../hooks/use-chat-widget";
import type { ChannelType, ChatWidgetProps } from "../types";
import { Chat } from "./chat";
import { ChatList } from "./chat-list";

interface ChannelEntry {
  url: string;
  name: string;
  key: string;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ onClose }) => {
  const { unReactiveOpenChats } = useChatWidget();
  const [channels, setChannels] = useState<ChannelEntry[]>([]);

  const handleSelection = useCallback(
    (c: ChannelType) => {
      if (!c) return;

      const { url, name } = c;

      if (channels.find((t) => t.url === url)) return;

      const channelsOpen = [
        ...channels,
        { url, name, key: `${url}-${Date.now()}` },
      ];

      unReactiveOpenChats.current.push(url);

      setChannels(channelsOpen);
    },
    [channels, unReactiveOpenChats]
  );

  return (
    <div className="flex flex-row h-screen">
      <ChatList onChannelSelect={handleSelection} onClose={onClose} />

      <div className="flex-1 p-4 flex flex-wrap gap-4 overflow-auto w-full">
        {channels.map((entry) => (
          <Chat key={entry.key} channelUrl={entry.url} />
        ))}
      </div>
    </div>
  );
};
