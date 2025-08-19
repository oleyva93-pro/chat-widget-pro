import { useSendbird } from "@sendbird/uikit-react";
import { useState, useEffect, useCallback } from "react";

import { useEventHandlers } from "./use-event-handlers";

export const useUnreadMessages = () => {
  const {
    state: { stores },
  } = useSendbird();
  const sdk = stores?.sdkStore.sdk;

  const [unreadCount, setUnreadCount] = useState(0);

  const getUnreadMessageCount = useCallback(() => {
    if (!sdk?.groupChannel?.getTotalUnreadMessageCount) return;

    sdk?.groupChannel?.getTotalUnreadMessageCount?.().then((count: number) => {
      setUnreadCount(count);
    });
  }, [sdk]);

  useEventHandlers({
    onMessageReceived: () => {
      getUnreadMessageCount();
    },
    onChannelChanged: () => {
      getUnreadMessageCount();
    },
  });

  useEffect(() => {
    getUnreadMessageCount();
  }, [getUnreadMessageCount]);

  return unreadCount;
};
