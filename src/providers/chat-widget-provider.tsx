import React, { useCallback, useMemo, useState } from "react";

import { ChatWidgetContext } from "../context/chat-widget-context";
import type {
  ChannelEntry,
  ChannelType,
  ChatWidgetProviderProps,
} from "../types";
import { RQProvider } from "./rq-provider";
import { SBProvider } from "./sb-provider";

export const ChatWidgetProvider: React.FC<ChatWidgetProviderProps> = ({
  children,
  config,
}) => {
  const [channels, setChannels] = useState<Map<string, ChannelEntry>>(
    new Map()
  );

  const channelsArray = useMemo(
    () => Array.from(channels.values()),
    [channels]
  );

  const handleSelection = useCallback((c: ChannelType) => {
    if (!c) return;

    const { url } = c;

    setChannels((prev) => {
      if (prev.get(url)) return prev;

      const channelsOpen = new Map(prev);
      channelsOpen.set(url, {
        url,
        key: `${url}-${Date.now()}`,
        minimized: true,
      });

      return channelsOpen;
    });
  }, []);

  const handleCloseChat = useCallback((url: string) => {
    setChannels((prev) => {
      const newChannels = new Map(prev);
      newChannels.delete(url);
      return newChannels;
    });
  }, []);

  const handleMinimizeChat = useCallback((url: string) => {
    setChannels((prev) => {
      const newChannels = new Map(prev);
      const channel = newChannels.get(url);

      if (!channel) return prev;

      newChannels.set(url, { ...channel, minimized: !channel.minimized });
      return newChannels;
    });
  }, []);

  return (
    <SBProvider config={config}>
      <RQProvider>
        <ChatWidgetContext.Provider
          value={{
            channels: channelsArray,
            handleSelection,
            handleCloseChat,
            handleMinimizeChat,
          }}
        >
          {children}
        </ChatWidgetContext.Provider>
      </RQProvider>
    </SBProvider>
  );
};
