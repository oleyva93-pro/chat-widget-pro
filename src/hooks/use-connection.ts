import { useSendbird } from "@sendbird/uikit-react";
import { useCallback } from "react";

import type { ChatWidgetConfig } from "../types";

export function useConnection(config: ChatWidgetConfig) {
  const {
    state: { stores },
  } = useSendbird();
  const sdk = stores?.sdkStore.sdk;

  const handleDisconnect = useCallback(() => {
    sdk?.disconnect();
  }, [sdk]);

  const handleConnect = useCallback(() => {
    sdk?.connect(config.userId);
  }, [sdk, config.userId]);

  return {
    handleDisconnect,
    handleConnect,
  };
}
