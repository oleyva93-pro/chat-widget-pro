import { memo } from "react";
import type { ChatHistoryMessage } from '@/types';

export const AdminMessage = memo(
  ({ message }: { message: ChatHistoryMessage }) => {
    return (
      <div className="flex items-center justify-center gap-2 w-full">
        <label className="text-xs text-gray-500 font-bold">
          {message.message}
        </label>
      </div>
    );
  }
);
