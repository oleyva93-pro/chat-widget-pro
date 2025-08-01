import type { ChatWidgetState } from "../types";
export interface ChatWidgetContextType {
    state: ChatWidgetState;
    toggleChat: () => void;
    selectChannel: (channel: any) => void;
    updateUnreadCount: (count: number) => void;
    setConnected: (connected: boolean) => void;
}
export declare const ChatWidgetContext: import("react").Context<ChatWidgetContextType>;
//# sourceMappingURL=ChatWidgetContext.d.ts.map