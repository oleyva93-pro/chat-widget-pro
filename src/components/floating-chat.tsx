import { useSendbird } from "@sendbird/uikit-react";
import ChannelAvatar from "@sendbird/uikit-react/ui/ChannelAvatar";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import { useChannelData } from "../hooks/use-channel";
import { useChatWidget } from "../hooks/use-chat-widget";
import Badge from "@sendbird/uikit-react/ui/Badge";
import { X } from "lucide-react";
import { useState } from "react";

export function FloatingChat({ channelUrl }: { channelUrl: string }) {
  const { channel, name } = useChannelData();
  const { state } = useSendbird();
  const { handleMinimizeChat, handleCloseChat } = useChatWidget();

  const [showCloseButton, setShowCloseButton] = useState(false);

  const currentUser = state.config.userId;

  const nickname =
    channel?.lastMessage?.sender?.userId === currentUser
      ? "You"
      : channel?.lastMessage?.sender?.nickname;

  return (
    <section className="relative">
      <div
        data-tooltip-id={channelUrl}
        className="bg-gray-200 relative cursor-pointer rounded-full justify-center items-center flex p-1 transition delay-50 duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-100 "
        onClick={() => handleMinimizeChat(channelUrl)}
        onMouseEnter={() => setShowCloseButton(true)}
        onMouseLeave={() => setShowCloseButton(false)}
      >
        <ChannelAvatar channel={channel!} userId="" theme="light" />
        {channel?.unreadMessageCount ? (
          <Badge
            count={channel?.unreadMessageCount ?? 0}
            className="absolute top-0 left-0"
          />
        ) : null}
        {showCloseButton ? (
          <div
            className="absolute bg-white top-0 right-0 cursor-pointer rounded-full justify-center items-center flex p-1 transition delay-50 duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-100 "
            onClick={() => handleCloseChat(channelUrl)}
          >
            <X className="h-3 w-3" />
          </div>
        ) : null}
      </div>
      <Tooltip
        id={channelUrl}
        place="left"
        className="bg-white"
        variant="light"
      >
        <div className="flex flex-col gap-2 bg-white">
          <span className="font-bold">{name}</span>
          <span className="text-sm truncate w-40">
            {nickname}: {channel?.lastMessage?.message}
          </span>
        </div>
      </Tooltip>
    </section>
  );
}
