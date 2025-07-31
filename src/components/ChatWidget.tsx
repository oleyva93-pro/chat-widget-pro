import React, { useState } from "react";
import "@sendbird/uikit-react/dist/index.css";
import { GroupChannelList } from "@sendbird/uikit-react/GroupChannelList";
import GroupChannel from "@sendbird/uikit-react/GroupChannel";
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import type { ChatWidgetProps } from "../types";
import { ChatIcon } from "./ChatIcon";
import { useChatWidget } from "../hooks/useChatWidget";

interface ChannelEntry {
  url: string;
  name: string;
  key: string;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({
  config,
  className = "",
}) => {
  const { state, toggleChat } = useChatWidget();
  const [channels, setChannels] = useState<ChannelEntry[]>([]);

  const positionClasses: Record<string, string> = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
  };

  const position = config.position || "bottom-right";

  const handleSelection = (url: string, name: string) => {
    setChannels((prev) => {
      if (prev.find((t) => t.url === url)) return prev;
      return [...prev, { url, name, key: `${url}-${Date.now()}` }];
    });
  };

  if (!state.isOpen) {
    return (
      <div className={`fixed ${positionClasses[position]} z-50 ${className}`}>
        <ChatIcon
          unreadCount={state.unreadCount}
          onClick={toggleChat}
          showBadge={config.showUnreadBadge !== false}
          size="lg"
        />
      </div>
    );
  }

  return (
    <div className={`fixed ${positionClasses[position]} z-50 ${className}`}>
      <SendbirdProvider
        appId={config.appId}
        userId={config.userId}
        sdkInitParams={{
          appStateToggleEnabled: false,
        }}
      >
        <div className="bg-white rounded-lg shadow-2xl border border-gray-200 w-[800px] h-[600px] flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Chat</h3>
              <button
                onClick={toggleChat}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-1 overflow-hidden">
            {/* Channel List */}
            <div className="w-80 border-r border-gray-200">
              <GroupChannelList
                disableAutoSelect
                onChannelCreated={() => {}}
                onChannelSelect={(c) => c && handleSelection(c.url, c.name)}
              />
            </div>

            {/* Chat Areas */}
            <div className="flex-1 p-4 flex flex-wrap gap-4 overflow-auto">
              {channels.map((entry) => (
                <div
                  className="relative w-[450px] h-[500px] border border-gray-200 rounded-lg"
                  key={entry.key}
                >
                  <GroupChannel key={entry.key} channelUrl={entry.url} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </SendbirdProvider>
    </div>
  );
};
