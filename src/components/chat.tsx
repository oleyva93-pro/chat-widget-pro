import "@sendbird/uikit-react/dist/index.css";
import GroupChannel from "@sendbird/uikit-react/GroupChannel";
import {
  GroupChannelProvider,
  useGroupChannelContext,
} from "@sendbird/uikit-react/GroupChannel/context";
import React, { memo, useState } from "react";

import type { ChatWindowProps } from "../types";
import { ChatSettingsSection } from "./chat-settings-section";
import { DragResize } from "./ui/drag-resize";

export const Chat: React.FC<ChatWindowProps> = memo(({ channelUrl }) => {
  if (!channelUrl) {
    return null;
  }

  return (
    <DragResize>
      <GroupChannelProvider channelUrl={channelUrl}>
        <ChanelSection channelUrl={channelUrl} />
      </GroupChannelProvider>
    </DragResize>
  );
});

function ChanelSection({ channelUrl }: { channelUrl: string }) {
  const [showSettings, setShowSettings] = useState(false);
  const { currentChannel } = useGroupChannelContext();

  return (
    <div className="relative w-full h-full rounded-xl bg-white p-1 border border-gray-200">
      <GroupChannel
        channelUrl={channelUrl || currentChannel.url}
        key={channelUrl}
        onChatHeaderActionClick={() => setShowSettings(true)}
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
