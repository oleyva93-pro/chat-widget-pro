import { GroupChannel, GroupChannelHandler } from "@sendbird/chat/groupChannel";
import { useSendbird } from "@sendbird/uikit-react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import ConnectionHandler from "@sendbird/uikit-react/handlers/ConnectionHandler";

import { ChatWidgetContext } from "../context/chat-widget-context";
import { useChatWidget } from "../hooks/use-chat-widget";
import { playAlarmSound, triggerNotification } from "../lib/notifications";
import type {
  ChannelEntry,
  ChannelType,
  ChatWidgetConfig,
  ChatWidgetProviderProps,
} from "../types";
import { RQProvider } from "./rq-provider";
import { SBProvider } from "./sb-provider";
import { useImperativeGetChannel } from "../hooks/use-channel";

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
      }}
    >
      <Handlers />
      {children}
    </ChatWidgetContext.Provider>
  );
}

function Handlers() {
  const {
    state: { stores },
  } = useSendbird();
  const sdk = stores?.sdkStore.sdk;
  const { state, logger } = useChatWidget();

  useEffect(() => {
    if (!sdk.addConnectionHandler) return;

    try {
      const groupChannelHandler = new GroupChannelHandler({
        onMessageReceived: (channel, message) => {
          if (state.withNotification) {
            triggerNotification(message, channel as GroupChannel);
          }
          if (state.withSound) {
            playAlarmSound();
          }
        },
      });

      const connectionHandler = new ConnectionHandler({
        onConnected: () => {
          logger("Connected", "info");
        },
      });

      if (typeof sdk?.addConnectionHandler === "function") {
        sdk.addConnectionHandler("UNIQUE_HANDLER_ID", connectionHandler);
      }

      sdk?.groupChannel?.addGroupChannelHandler(
        "group-channel-handler",
        groupChannelHandler
      );
    } catch {
      logger(
        "Something went wrong with the Sendbird connection handler",
        "error"
      );
    }

    return () => {
      try {
        sdk?.removeConnectionHandler?.("connection-handler");
        sdk?.groupChannel?.removeGroupChannelHandler?.("group-channel-handler");
      } catch {
        logger("Failed to remove the connectionHandler", "error");
      }
    };
  }, [sdk, state.withSound, state.withNotification, logger]);

  return null;
}
