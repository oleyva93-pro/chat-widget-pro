import type { GroupChannel } from "@sendbird/chat/groupChannel";

import { useChatWidget } from "../../hooks/use-chat-widget";
import { useEventHandlers } from "../../hooks/use-event-handlers";
import { playAlarmSound, triggerNotification } from "../../lib/notifications";

export function Handlers() {
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
