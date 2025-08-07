import { useSendbird } from "@sendbird/uikit-react";
import Badge from "@sendbird/uikit-react/ui/Badge";
import ChannelAvatar from "@sendbird/uikit-react/ui/ChannelAvatar";
import { memo } from "react";
import { Tooltip } from "react-tooltip";

import { useChannelData } from "../../../hooks/use-channel";
import { getMessageNickname, getMessageSender } from "../../../lib/utils";
import ProfileImage from "../../ui/profile-image";

export const FloatingContent = memo(
  ({ channelUrl }: { channelUrl: string }) => {
    const { channel, name } = useChannelData();
    const { state } = useSendbird();

    const currentUser = state.config.userId;

    const nickname = getMessageNickname(channel, currentUser);

    const sender = getMessageSender(channel);

    return (
      <div className="flex items-center">
        {sender ? (
          <ProfileImage
            profileUrl={sender?.plainProfileUrl || sender?.profileUrl || ""}
            nickname={sender?.nickname || ""}
            height={52}
            width={52}
            fontSize={15}
          />
        ) : (
          <ChannelAvatar channel={channel!} userId="" theme="light" />
        )}

        {channel?.unreadMessageCount ? (
          <Badge
            count={channel?.unreadMessageCount ?? 0}
            className="absolute top-0 left-0"
          />
        ) : null}
        <Tooltip
          id={channelUrl}
          place="left"
          className="bg-white/90 shadow-chw rounded-2xl"
          variant="light"
        >
          <div className="flex flex-col gap-2 bg-white">
            <span className="font-bold">{name}</span>
            <span className="text-sm truncate w-40">
              {nickname} {channel?.lastMessage?.message}
            </span>
          </div>
        </Tooltip>
      </div>
    );
  }
);
