import { GroupChannel, GroupChannelHandler } from "@sendbird/chat/groupChannel";
import { useSendbird } from "@sendbird/uikit-react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

import { ChatWidgetContext } from "../context/chat-widget-context";
import { useChatWidget } from "../hooks/use-chat-widget";
import { playAlarmSound, triggerNotification } from "../lib/notifications";
import type {
  ChannelEntry,
  ChannelType,
  ChatWidgetProviderProps,
} from "../types";
import { RQProvider } from "./rq-provider";
import { SBProvider } from "./sb-provider";

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

export const ChatWidgetProvider: React.FC<ChatWidgetProviderProps> = ({
  children,
  config,
}) => {
  const [state, dispatch] = useReducer(notificationReducer, {
    withSound: config.withSound ?? true,
    withNotification: config.withNotification ?? true,
  });

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

  const handleToggleSound = useCallback(() => {
    dispatch("toggleSound");
  }, []);

  const handleToggleNotification = useCallback(() => {
    dispatch("toggleNotification");
  }, []);

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
            state,
            handleToggleSound,
            handleToggleNotification,
          }}
        >
          <Handlers />
          {children}
        </ChatWidgetContext.Provider>
      </RQProvider>
    </SBProvider>
  );
};

function Handlers() {
  const {
    state: { stores },
  } = useSendbird();
  const sdk = stores?.sdkStore.sdk;
  const { state } = useChatWidget();

  useEffect(() => {
    if (!sdk) return;

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

    sdk?.groupChannel?.addGroupChannelHandler(
      "group-channel-handler",
      groupChannelHandler
    );

    return () => {
      sdk?.groupChannel?.removeGroupChannelHandler("group-channel-handler");
    };
  }, [sdk, state.withSound, state.withNotification]);

  return null;
}
