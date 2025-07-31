import React from "react";
import { GroupChannelList } from "@sendbird/uikit-react/GroupChannelList";
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import type { ChannelListProps } from "../types";

export const ChannelList: React.FC<ChannelListProps> = ({
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
