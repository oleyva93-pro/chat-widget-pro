import GroupChannel from "@sendbird/uikit-react/GroupChannel";
import { GroupChannelProvider } from "@sendbird/uikit-react/GroupChannel/context";
import React, { memo, useState } from "react";

import { useChannelData } from "../hooks/use-channel";
import { getChannelStatus } from "../lib/utils";
import { ChannelStatus, type ChatWindowProps } from "../types";
import ChatHeader from "./chat-header";
import { ChatSettingsSection } from "./chat-settings-section";
import { GroupMessageList } from "./group-message-list";
import { DragResize } from "./ui/drag-resize";

export const Chat: React.FC<ChatWindowProps> = memo(
  ({ channelUrl, index, onCloseChat, onMinimizeChat }) => {
    if (!channelUrl) {
      return null;
    }

    return (
      <DragResize index={index}>
        <GroupChannelProvider channelUrl={channelUrl}>
          <ChanelSection
            channelUrl={channelUrl}
            onCloseChat={onCloseChat}
            onMinimizeChat={onMinimizeChat}
          />
        </GroupChannelProvider>
      </DragResize>
    );
  }
);

function ChanelSection({
  channelUrl,
  onCloseChat,
  onMinimizeChat,
}: {
  channelUrl: string;
  onCloseChat?: () => void;
  onMinimizeChat?: () => void;
}) {
  const [showSettings, setShowSettings] = useState(false);
  const channelData = useChannelData();

  const channelStatus = getChannelStatus(channelData.channel ?? null);

  function handleShowSettings() {
    setShowSettings((prev) => !prev);
  }

  const isPending = channelStatus === ChannelStatus.PENDING;

  return (
    <div className="relative w-full h-full rounded-xl bg-white p-1 border border-gray-200 animate-fade-in shadow-chw">
      <GroupChannel
        channelUrl={channelUrl}
        key={channelUrl}
        renderMessageList={(props) => (
          <GroupMessageList isPending={isPending} {...props} />
        )}
        renderChannelHeader={() => (
          <ChatHeader
            onInfoClick={handleShowSettings}
            onMinusClick={onMinimizeChat}
            onXClick={onCloseChat}
          />
        )}
      />

      {showSettings && (
        <div className="absolute top-0 right-0 w-full h-full bg-chw-overlay flex justify-end rounded-xl shadow-chw">
          <ChatSettingsSection
            channelUrl={channelUrl}
            onClose={() => setShowSettings(false)}
          />
        </div>
      )}
    </div>
  );
}
