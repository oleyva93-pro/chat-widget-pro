import "@sendbird/uikit-react/dist/index.css";
import GroupChannel from "@sendbird/uikit-react/GroupChannel";
import { GroupChannelProvider } from "@sendbird/uikit-react/GroupChannel/context";
import React, { memo, useState } from "react";

import { useChannelData } from "../hooks/use-channel";
import { cn, getChannelStatus } from "../lib/utils";
import { ChannelStatus, type ChatWindowProps } from "../types";
import { ChatSettingsSection } from "./chat-settings-section";
import { GroupMessageList } from "./group-message-list";
import { DragResize } from "./ui/drag-resize";
import ChatHeader from "./chat-header";

export const Chat: React.FC<ChatWindowProps> = memo(
  ({ channelUrl, index, onCloseChat, onMinimizeChat, minimized }) => {
    if (!channelUrl) {
      return null;
    }

    return (
      <DragResize index={index} minimized={minimized}>
        <GroupChannelProvider channelUrl={channelUrl}>
          <ChanelSection
            channelUrl={channelUrl}
            onCloseChat={onCloseChat}
            onMinimizeChat={onMinimizeChat}
            minimized={minimized}
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
  minimized,
}: {
  channelUrl: string;
  onCloseChat?: () => void;
  onMinimizeChat?: () => void;
  minimized?: boolean;
}) {
  const [showSettings, setShowSettings] = useState(false);
  const channelData = useChannelData();

  const channelStatus = getChannelStatus(channelData.channel ?? null);

  function handleShowSettings() {
    setShowSettings((prev) => !prev);
  }

  const isPending = channelStatus === ChannelStatus.PENDING;

  return (
    <div
      className={cn(
        "relative w-full rounded-xl bg-white p-1 border border-gray-200",
        {
          "h-full": !minimized,
        }
      )}
    >
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
        <div className="absolute top-0 right-0 w-full h-full bg-black/50 flex justify-end rounded-xl">
          <ChatSettingsSection
            channelUrl={channelUrl}
            onClose={() => setShowSettings(false)}
          />
        </div>
      )}
    </div>
  );
}
