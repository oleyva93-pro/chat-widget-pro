import React from "react";
import GroupChannel from "@sendbird/uikit-react/GroupChannel";
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import type { ChatWindowProps } from "../types";

export const ChatWindow: React.FC<ChatWindowProps> = ({
  config,
  channelUrl,
  className = "",
}) => {
  if (!channelUrl) {
    return (
      <div className={`flex items-center justify-center h-full ${className}`}>
        <div className="text-center text-gray-500">
          <h4 className="font-semibold text-gray-800 mb-2">
            Selecciona un canal
          </h4>
          <p className="text-sm">
            Haz clic en un canal para comenzar a chatear
          </p>
        </div>
      </div>
    );
  }

  return (
    <SendbirdProvider
      appId={config.appId}
      userId={config.userId}
      accessToken={config.accessToken}
      sdkInitParams={{
        appStateToggleEnabled: false,
      }}
    >
      <div className={`h-full ${className}`}>
        <GroupChannel channelUrl={channelUrl} />
      </div>
    </SendbirdProvider>
  );
};
