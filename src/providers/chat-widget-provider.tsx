import { GroupChannel } from "@sendbird/chat/groupChannel";
import React, { useCallback, useMemo, useReducer, useState } from "react";

import { ChatWidgetContext } from "../context/chat-widget-context";
import { useImperativeGetChannel } from "../hooks/use-channel";
import { useChatWidget } from "../hooks/use-chat-widget";
import { useEventHandlers } from "../hooks/use-event-handlers";
import { playAlarmSound, triggerNotification } from "../lib/notifications";
import type {
  ChannelEntry,
  ChannelType,
  ChatWidgetConfig,
  ChatWidgetProviderProps,
} from "../types";
import { RQProvider } from "./rq-provider";
import { SBProvider } from "./sb-provider";

export const ChatWidgetProvider: React.FC<ChatWidgetProviderProps> = ({
  children,
  config,
}) => {
  return (
    <SBProvider config={config}>
      <RQProvider>
        <MainActions config={config}>{children}</MainActions>
      </RQProvider>
    </SBProvider>
  );
};

const notificationReducer = (
  state: { withSound: boolean; withNotification: boolean },
  action: "toggleSound" | "toggleNotification"
) => {
  switch (action) {
    case "toggleSound":
      return { ...state, withSound: !state.withSound };
    case "toggleNotification":
      return { ...state, withNotification: !state.withNotification };
  }

  return state;
};

function MainActions({
  children,
  config,
}: {
  children: React.ReactNode;
  config: ChatWidgetConfig;
}) {
  const [state, dispatch] = useReducer(notificationReducer, {
    withSound: config.withSound ?? true,
    withNotification: config.withNotification ?? true,
  });

  const logger = useCallback(
    (message: string, type: "error" | "warn" | "info" | "debug") => {
      if (config?.logger) {
        config.logger(message, type);
        return;
      }

      console.log(message, type);
    },
    [config]
  );

  const getChannel = useImperativeGetChannel();

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
    async (url: string) => {
      try {
        const channel = await getChannel(url);
        if (!channel) {
          logger("Channel not found", "error");
          return;
        }
        handleSelection({ url } as { url: string });
      } catch {
        logger("Error opening chat or channel not found", "error");
      }
    },
    [handleSelection, getChannel, logger]
  );

  const handleJoinChannel = useCallback(
    async (url: string, technician: string) => {
      try {
        const channel = await getChannel(url);
        if (channel) {
          await channel.join();
          if (technician) {
            await channel.updateMetaData(
              {
                associatedTechnician: technician,
              },
              true
            );
          }
          handleOpenChat(url);
        }
      } catch {
        logger("Error joining channel", "error");
      }
    },
    [getChannel, handleOpenChat, logger]
  );

  const handleToggleSound = useCallback(() => {
    dispatch("toggleSound");
  }, []);

  const handleToggleNotification = useCallback(() => {
    dispatch("toggleNotification");
  }, []);
  return (
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
        state,
        handleToggleSound,
        handleToggleNotification,
        logger,
        handleJoinChannel,
      }}
    >
      <Handlers />
      {children}
    </ChatWidgetContext.Provider>
  );
}

function Handlers() {
  const { state, logger } = useChatWidget();

  useEventHandlers({
    onMessageReceived: (channel, message) => {
      if (state.withNotification) {
        triggerNotification(message, channel as GroupChannel);
      }
      if (state.withSound) {
        playAlarmSound();
      }
    },
    onConnected: () => {
      logger("Connected", "info");
    },
    onError: (error) => {
      logger(error.message, "error");
    },
  });

  return null;
}
