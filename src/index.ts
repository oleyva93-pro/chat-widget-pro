// Import styles
import "./styles/index.css";
import "react-tooltip/dist/react-tooltip.css";

// Main widget component
export { ChatWidget } from "./components/chat/chat-widget";

// Individual components for modular use
export { ChatList } from "./components/list/chat-list";

// Provider and hooks
export { ChatWidgetProvider } from "./providers/chat-widget-provider";
export { useChatWidget } from "./hooks/use-chat-widget";
export { useUnreadMessages } from "./hooks/use-unread-messages";

// Types
export type {
  SendBirdConfig,
  ChatWidgetConfig,
  ChatIconProps,
  ChatListProps,
  ChannelListProps,
  ChatWindowProps,
  ChatWidgetProps,
  ChatWidgetProviderProps,
} from "./types";
