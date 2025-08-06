import type { GroupChannel } from "@sendbird/chat/groupChannel";
import { User } from "lucide-react";
import React from "react";

import {
  cn,
  getChannelStatus,
  getFormattedChannel,
  messageDistance,
  truncateText,
} from "../lib/utils";
import { ChannelStatus, type ChatListItemProps } from "../types";
import ProfileImage from "./ui/profile-image";
import Badge from "@sendbird/uikit-react/ui/Badge";
import { PendingSpinner } from "./ui/pending-spinner";
import {
  useChannelMetadata,
  useGetChannelMetadata,
} from "../hooks/use-channel";

export const ChatListItem: React.FC<ChatListItemProps> = ({
  channel,
  className,
}) => {
  const { name, data } = getFormattedChannel(channel);

  const sender = channel?.lastMessage?.isUserMessage()
    ? channel?.lastMessage?.sender
    : undefined;

  return (
    <div
      className={cn(
        "flex flex-col gap-2 p-4 hover:bg-gray-100 cursor-pointer border-b border-gray-200",
        className
      )}
    >
      <div className="relative flex gap-2 justify-between w-full">
        <h4 className="text-sm font-medium w-[60%] truncate">{name}</h4>
        <span className="text-xs text-gray-500">WO# {data.wo}</span>
        {channel?.unreadMessageCount ? (
          <Badge
            count={channel?.unreadMessageCount}
            className="absolute top-7 right-5"
          />
        ) : null}
      </div>
      {sender ? (
        <SenderInfo channel={channel} />
      ) : (
        <NoSenderInfo channel={channel} />
      )}
    </div>
  );
};

function SenderInfo({ channel }: { channel: GroupChannel }) {
  const sender = channel?.lastMessage?.isUserMessage()
    ? channel?.lastMessage?.sender
    : undefined;

  return (
    <div className="flex justify-between items-end">
      <div className="flex gap-2">
        <ProfileImage
          profileUrl={sender?.profileUrl || ""}
          nickname={sender?.nickname || ""}
          height={32}
          width={32}
          fontSize={12}
        />
        <div className="flex flex-col">
          <h4 className="text-sm font-medium">
            {sender?.nickname || "SA"}&nbsp;&nbsp;
            <span className="text-xs text-gray-500">
              {messageDistance(channel?.lastMessage?.createdAt || 0)}
            </span>
          </h4>
          <h5 className="text-xs text-gray-500 truncate">
            {truncateText(channel?.lastMessage?.message || "", 25)}
          </h5>
        </div>
      </div>
      <div className="flex gap-1 items-center">
        <User size={12} className="text-gray-500" />
        <span className="text-xs text-gray-500">{channel?.memberCount}</span>
      </div>
    </div>
  );
}

export function NoSenderInfo({ channel }: { channel: GroupChannel }) {
  const channelStatus = getChannelStatus(channel ?? null);
  const { data: channelMetadata } = useGetChannelMetadata(() =>
    channel?.getMetaData([])
  );

  const isPending = channelStatus === ChannelStatus.PENDING;

  const hasTechnician = Boolean(channelMetadata?.associatedTechnician);

  return (
    <div className="relative">
      {isPending || !hasTechnician ? (
        <label className="w-full h-full flex flex-col  text-xs text-gray-500 px-1">
          <PendingSpinner className="justify-start" />
          Waiting for the asTech technician to join.
        </label>
      ) : (
        <label className="w-full h-full flex flex-col  text-xs text-gray-500">
          No messages yet.
        </label>
      )}
      <div className="flex gap-1 items-center absolute right-0 bottom-0">
        <User size={12} className="text-gray-500" />
        <span className="text-xs text-gray-500">{channel?.memberCount}</span>
      </div>
    </div>
  );
}
