import { GroupChannelModule } from "@sendbird/chat/groupChannel";
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import React from "react";

import type { ChatWidgetConfig } from '@/types';

export function SBProvider({
  children,
  config,
}: {
  children: React.ReactNode;
  config: ChatWidgetConfig;
}) {
  return (
    <SendbirdProvider
      appId={config.appId}
      userId={config.userId}
      profileUrl={config.profileUrl}
      nickname={config.nickname}
      eventHandlers={{
        connection: {
          onConnected: (user) => {
            user.updateMetaData(
              {
                email: config.userId,
                name: config.nickname ?? "",
              },
              true
            );
          },
        },
      }}
      sdkInitParams={{
        appStateToggleEnabled: false,
        modules: [new GroupChannelModule()],
      }}
      uikitOptions={{
        groupChannel: {
          enableVoiceMessage: false,
        },
      }}
    >
      {children}
    </SendbirdProvider>
  );
}
