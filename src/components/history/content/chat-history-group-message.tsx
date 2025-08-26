import { memo } from "react";

import type { ChatHistoryMessage } from "../../../types";
import { formatDate } from "../../../lib/date";
import { AdminMessage } from "./admin-message";
import { UserMessage } from "./user-message";

export const ChatHistoryGroupMessage = memo(
  ({ group }: { group: [string, ChatHistoryMessage[]] }) => {
    const [day, messages] = group;
    return (
      <div className="p-2 text-black relative">
        <div className="text-sm text-gray-500 flex items-center gap-3 sticky top-0 bg-gray-200 rounded-lg px-5 py-0.5 justify-center">
          <span className="text-xs text-gray-500 font-bold">
            {formatDate(new Date(day), "short")}
          </span>
        </div>
        <div className="flex flex-col-reverse gap-2 py-3">
          {messages.map((message) => (
            <ChatHistoryMessage message={message} />
          ))}
        </div>
      </div>
    );
  }
);

const ChatHistoryMessage = memo(
  ({ message }: { message: ChatHistoryMessage }) => {
    const type = message.type;

    if (type === "ADMM") {
      return <AdminMessage message={message} />;
    }

    return <UserMessage message={message} />;
  }
);
