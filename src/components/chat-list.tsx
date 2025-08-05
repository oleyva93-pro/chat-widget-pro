import { PublicChannelFilter } from "@sendbird/chat/groupChannel";
import { GroupChannelList } from "@sendbird/uikit-react/GroupChannelList";
import { X } from "lucide-react";
import React, { memo, useState } from "react";
import { useDebounce } from "use-debounce";

import type { ChannelListProps } from "../types";
import { SearchInput } from "./ui/search-input";

export const ChatList: React.FC<ChannelListProps> = memo(
  ({ onChannelSelect, onClose }) => {
    const [search, setSearch] = useState("");
    const [value] = useDebounce(search, 500);

    return (
      <GroupChannelList
        disableAutoSelect
        onChannelCreated={() => {}}
        renderHeader={() => (
          <section className="">
            <header className="border-b border-gray-200 p-4 flex justify-between items-center">
              <section>
                <h3 className="text-xl text-black">Chats</h3>
              </section>
              <section className="hover:bg-gray-100 rounded-full p-1">
                <X
                  className="w-5 h-5 cursor-pointer "
                  color="black"
                  onClick={onClose}
                />
              </section>
            </header>
            <section className="p-4">
              <SearchInput
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </section>
          </section>
        )}
        renderPlaceHolderLoading={() => (
          <div className="px-4 text-gray-400">Loading chats...</div>
        )}
        channelListQueryParams={{
          channelNameContainsFilter: value,
          includeEmpty: true,
          limit: 100,
          publicChannelFilter: PublicChannelFilter.PUBLIC,
        }}
        onChannelSelect={(channel) => {
          if (channel && onChannelSelect) {
            onChannelSelect(channel);
          }
        }}
      />
    );
  }
);
