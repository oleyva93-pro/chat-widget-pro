import { useSendbird } from "@sendbird/uikit-react";
import { useCallback, useEffect } from "react";

import type { ChatWidgetConfig } from '@/types';
import type SendbirdChat from "@sendbird/chat";

export function useConnection(config: ChatWidgetConfig) {
  const {
    state: { stores },
  } = useSendbird();
  const sdk = stores?.sdkStore.sdk as SendbirdChat;

  const handleDisconnect = useCallback(() => {
    sdk?.disconnect();
  }, [sdk]);

  const handleConnect = useCallback(() => {
    sdk?.connect(config.userId);
  }, [sdk, config.userId]);

  useEffect(() => {
    if (Object.keys(sdk).length > 0) {
      sdk.updateCurrentUserInfo({
        nickname: config.nickname || config.userId,
        profileUrl: config.profileUrl || undefined,
      });
    }
  }, [sdk, config.userId, config.nickname, config.profileUrl]);

  return {
    handleDisconnect,
    handleConnect,
  };
}
