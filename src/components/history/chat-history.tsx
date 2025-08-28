import { ChatHistoryContext } from '@/context/chat-history-context';
import { chatHistoryRef } from '@/lib/chat-history-singleton';
import type { ChatHistoryProps } from '@/types';
import { ChatHistoryWrapper } from '@/components/history/chat-history-wrapper';

export function ChatHistory({
  externalHistoryUrl,
  externalToken,
}: ChatHistoryProps) {
  return (
    <ChatHistoryContext.Provider value={{ externalHistoryUrl, externalToken }}>
      <ChatHistoryWrapper ref={chatHistoryRef} />
    </ChatHistoryContext.Provider>
  );
}
