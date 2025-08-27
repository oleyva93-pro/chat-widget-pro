import { useSendbird } from "@sendbird/uikit-react";
import { memo } from "react";

import type { ChatHistoryMessage } from "../../../types";
import { formatDate } from "../../../lib/date";
import { cn } from "../../../lib/utils";
import ProfileImage from "../../ui/profile-image";

export const UserMessage = memo(
  ({ message }: { message: ChatHistoryMessage }) => {
    const {
      state: {
        config: { userId },
      },
    } = useSendbird();

    const isCurrentUser = message?.user?.user_id === userId;

    return (
      <div
        className={cn(
          "inline-flex flex-row items-end justify-center gap-2 p-2 rounded-lg",
          isCurrentUser ? "justify-end" : "justify-start"
        )}
      >
        <div
          className={cn(
            "flex items-end gap-2",
            isCurrentUser ? "flex-row-reverse" : "flex-row"
          )}
        >
          {isCurrentUser ? null : (
            <ProfileImage
              profileUrl={message?.user?.profile_url || ""}
              nickname={message?.user?.nickname || ""}
              height={32}
              width={32}
              fontSize={12}
            />
          )}
          <div className="flex flex-col gap-1">
            {isCurrentUser ? null : (
              <label className="text-xs text-gray-500 font-bold">
                {message.user.nickname}
              </label>
            )}
            <div
              className={cn(
                "bg-gray-200 flex justify-center rounded-2xl p-3",
                isCurrentUser ? "bg-chw-primary" : "bg-chw-secondary"
              )}
            >
              <label
                className={cn(
                  "text-sm",
                  isCurrentUser ? "text-white" : "text-black"
                )}
              >
                {message.message}
              </label>
            </div>
          </div>
          <label className="text-xs text-gray-500 mb-1">
            {formatDate(new Date(message.created_at), "time")}
          </label>
        </div>
      </div>
    );
  }
);
