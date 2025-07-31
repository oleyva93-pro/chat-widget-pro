import React from "react";
import "@sendbird/uikit-react/dist/index.css";
import { GroupChannelList } from "@sendbird/uikit-react/GroupChannelList";
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import type { ChatListProps } from "../types";

export const ChatList: React.FC<ChatListProps> = ({
  config,
  onChannelSelect,
  className = "",
}) => {
  return (
    <SendbirdProvider
      appId={config.appId}
      userId={config.userId}
      accessToken={config.accessToken}
      sdkInitParams={{
        appStateToggleEnabled: false,
      }}
    >
      <div className={`${className}`}>
        <GroupChannelList
          disableAutoSelect
          onChannelCreated={() => {}}
          onChannelSelect={(channel) => {
            if (channel && onChannelSelect) {
              onChannelSelect(channel);
            }
          }}
        />
      </div>
    </SendbirdProvider>
  );
};
