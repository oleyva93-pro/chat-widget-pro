import GroupChannel from "@sendbird/uikit-react/GroupChannel";
import { GroupChannelProvider } from "@sendbird/uikit-react/GroupChannel/context";
import React, { memo, useRef } from "react";

import { useChannelData } from "../../hooks/use-channel";
import { getChannelStatus } from "../../lib/utils";
import type { WithRefDialogHandle } from "../../lib/with-ref";
import { ChannelStatus, type ChatWindowProps } from "../../types";
import { DragResize } from "../ui/drag-resize";
import { InnerDrawerRef } from "../ui/inner-drawer-ref";
import ChatHeader from "./header/chat-header";
import { ChatSettingsSection } from "./chat-settings-section";
import { GroupMessageList } from "./group-message-list";

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
  const drawerRef = useRef<WithRefDialogHandle>(null);
  const channelData = useChannelData();

  const channelStatus = getChannelStatus(channelData.channel ?? null);

  function handleShowSettings() {
    drawerRef.current?.toggle();
  }

  const isPending = channelStatus === ChannelStatus.PENDING;

  return (
    <div className="relative w-full h-full rounded-xl bg-white p-1 border border-gray-200 animate-fade-in shadow-chw drag-handle">
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

      <InnerDrawerRef ref={drawerRef} onClose={handleShowSettings}>
        <ChatSettingsSection
          channelUrl={channelUrl}
          onClose={handleShowSettings}
        />
      </InnerDrawerRef>
    </div>
  );
}
