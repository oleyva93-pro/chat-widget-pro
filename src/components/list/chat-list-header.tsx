import { X } from "lucide-react";
import React, { memo } from "react";

import type { ChatListHeaderProps } from "../../types";
import { SearchInput } from "../ui/search-input";

export const ChatListHeader: React.FC<ChatListHeaderProps> = memo(
  ({ onSearch, onClose, className, searchValue }) => {
    return (
      <section className={className}>
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
          <SearchInput value={searchValue} onChange={onSearch} />
        </section>
      </section>
    );
  }
);
