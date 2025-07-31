// Main widget component
export { ChatWidget } from "./components/ChatWidget";

// Individual components for modular use
export { ChatIcon } from "./components/ChatIcon";
export { ChatList } from "./components/ChatList";
export { ChannelList } from "./components/ChannelList";
export { ChatWindow } from "./components/ChatWindow";

// Provider and hooks
export { ChatWidgetProvider } from "./providers/ChatWidgetProvider";
export { useChatWidget } from "./hooks/useChatWidget";
export { useUnreadMessages } from "./hooks/useUnreadMessages";

// Types
export type {
  SendBirdConfig,
  ChatWidgetConfig,
  ChatIconProps,
  ChatListProps,
  ChannelListProps,
  ChatWindowProps,
  ChatWidgetProps,
  ChatWidgetState,
  ChatWidgetProviderProps,
} from "./types";
