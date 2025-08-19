import GroupChannel from "@sendbird/uikit-react/GroupChannel";
import MessageInputWrapper from "@sendbird/uikit-react/GroupChannel/components/MessageInputWrapper";
import { GroupChannelProvider } from "@sendbird/uikit-react/GroupChannel/context";
import React, { memo, useRef } from "react";

import { useChannelData } from "../../hooks/use-channel";
import { getChannelStatus } from "../../lib/utils";
import type { WithRefDialogHandle } from "../../lib/with-ref";
import { ChannelStatus, type ChatWindowProps } from "../../types";
import { DragResize } from "../ui/drag-resize";
import { InnerDrawerRef } from "../ui/inner-drawer-ref";
import { ChatSettingsSection } from "./chat-settings-section";
import { GroupMessageList } from "./group-message-list";
import ChatHeader from "./header/chat-header";

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
  const { channel } = useChannelData();

  const existsChannel = !!channel;

  const channelStatus = getChannelStatus(channel ?? null);

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
          <GroupMessageList
            existsChannel={existsChannel}
            isPending={isPending}
            channelUrl={channelUrl}
            {...props}
          />
        )}
        renderMessageInput={() => (
          <MessageInputWrapper disabled={!existsChannel || isPending} />
        )}
        renderChannelHeader={() => (
          <ChatHeader
            onInfoClick={handleShowSettings}
            onMinusClick={onMinimizeChat}
            onXClick={onCloseChat}
            channelUrl={channelUrl}
          />
        )}
      />

      <InnerDrawerRef ref={drawerRef} onClose={handleShowSettings}>
        <ChatSettingsSection
          channelUrl={channelUrl}
          existsChannel={existsChannel}
          onClose={handleShowSettings}
        />
      </InnerDrawerRef>
    </div>
  );
}
