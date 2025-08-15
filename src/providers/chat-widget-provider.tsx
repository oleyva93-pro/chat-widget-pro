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

  const maximizedChannels = useMemo(() => {
    return channelsArray.filter((channel) => !channel.minimized);
  }, [channelsArray]);

  const minimizedChannels = useMemo(() => {
    return channelsArray.filter((channel) => channel.minimized);
  }, [channelsArray]);

  const handleSelection = useCallback((c: ChannelType | { url: string }) => {
    if (!c) return;

    const { url } = c;

    setChannels((prev) => {
      if (prev.get(url)) {
        const channel = prev.get(url);
        if (!channel?.minimized) {
          return prev;
        }
      }

      const channelsOpen = new Map(prev);
      channelsOpen.set(url, {
        url,
        key: `${url}-${Date.now()}`,
        minimized: false,
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

  const handleCloseAllChats = useCallback(() => {
    setChannels(new Map());
  }, []);

  const handleOpenChat = useCallback(
    (url: string) => {
      handleSelection({ url } as { url: string });
    },
    [handleSelection]
  );

  return (
    <SBProvider config={config}>
      <RQProvider>
        <ChatWidgetContext.Provider
          value={{
            channels: channelsArray,
            maximizedChannels,
            minimizedChannels,
            handleSelection,
            handleCloseChat,
            handleMinimizeChat,
            handleCloseAllChats,
            handleOpenChat,
          }}
        >
          {children}
        </ChatWidgetContext.Provider>
      </RQProvider>
    </SBProvider>
  );
};
