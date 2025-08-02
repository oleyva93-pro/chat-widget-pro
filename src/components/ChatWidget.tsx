import "@sendbird/uikit-react/dist/index.css";
import GroupChannel from "@sendbird/uikit-react/GroupChannel";
import { GroupChannelList } from "@sendbird/uikit-react/GroupChannelList";
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import React, { useState } from "react";
import { Drawer } from "vaul";
import type { ChatWidgetProps } from "../types";

interface ChannelEntry {
  url: string;
  name: string;
  key: string;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ config }) => {
  const [channels, setChannels] = useState<ChannelEntry[]>([]);
  const [search, setSearch] = useState("");

  const handleSelection = (url: string, name: string) => {
    setChannels((prev) => {
      if (prev.find((t) => t.url === url)) return prev;
      return [...prev, { url, name, key: `${url}-${Date.now()}` }];
    });
  };

  return (
    <SendbirdProvider
      appId={config.appId}
      userId={config.userId}
      sdkInitParams={{
        appStateToggleEnabled: false,
      }}
    >
      <Drawer.Root direction="right" fixed>
        <Drawer.Trigger className="relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-4 text-sm font-medium shadow-sm transition-all hover:bg-[#FAFAFA] dark:bg-[#161615] dark:hover:bg-[#1A1A19] dark:text-white">
          Open Drawer
        </Drawer.Trigger>
        {/* <Drawer.Portal> */}
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          className="right-2 top-2 bottom-2 fixed z-10 outline-none w-[340px] flex bg-transparent"
          style={
            {
              "--initial-transform": "calc(100% + 8px)",
            } as React.CSSProperties
          }
        >
          <div className="bg-white h-full w-full grow p-2 flex flex-col rounded-[16px] shadow-2xl">
            <input
              type="text"
              className="w-full p-2 rounded-md"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <GroupChannelList
              className="h-full w-full"
              disableAutoSelect
              onChannelCreated={() => {}}
              onChannelSelect={(c) => c && handleSelection(c.url, c.name)}
              channelListQueryParams={{
                channelNameContainsFilter: search,
              }}
            />
          </div>
        </Drawer.Content>
        {/* </Drawer.Portal> */}
      </Drawer.Root>

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
    </SendbirdProvider>
  );
};
