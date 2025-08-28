import { forwardRef, useImperativeHandle, useState } from "react";

import type { ChatHistoryHandle, ChatHistoryParams } from '@/types';
import { DragResize } from '@/components/ui/drag-resize';
import { ChatHistoryContainer } from '@/components/history/content/chat-history-container';

export const ChatHistoryWrapper = forwardRef<ChatHistoryHandle>((_, ref) => {
  const [params, setParams] = useState<ChatHistoryParams>();

  const isOpen = params?.vin && params?.woID;

  const handleClose = () => {
    setParams(undefined);
  };

  useImperativeHandle(ref, () => ({
    open: (params?: ChatHistoryParams) => {
      setParams(params);
    },
    close: handleClose,
  }));

  if (!isOpen) return null;

  return (
    <DragResize index={0.5}>
      <ChatHistoryContainer params={params} handleClose={handleClose} />
    </DragResize>
  );
});
