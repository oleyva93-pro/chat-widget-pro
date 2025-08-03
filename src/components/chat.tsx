import "@sendbird/uikit-react/dist/index.css";
import GroupChannel from "@sendbird/uikit-react/GroupChannel";
import React, { memo, useState } from "react";

import type { ChatWindowProps } from "../types";
import { ChatSettingsSection } from "./chat-settings-section";
import { DragResize } from "./ui/drag-resize";

export const Chat: React.FC<ChatWindowProps> = memo(({ channelUrl }) => {
  const [showSettings, setShowSettings] = useState(false);
  if (!channelUrl) {
    return null;
  }

  return (
    <DragResize>
      <div className="relative w-full h-full rounded-xl bg-white p-1 border border-gray-200">
        <GroupChannel
          channelUrl={channelUrl}
          key={channelUrl}
          onChatHeaderActionClick={() => setShowSettings(true)}
        />

        {showSettings && (
          <div className="absolute top-0 right-0 w-full h-full bg-black/50 flex justify-end">
            <ChatSettingsSection
              channelUrl={channelUrl}
              onClose={() => setShowSettings(false)}
            />
          </div>
        )}
      </div>
    </DragResize>
  );
});
