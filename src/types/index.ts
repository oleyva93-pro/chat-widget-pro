import type { GroupChannel } from "@sendbird/chat/groupChannel";

// Base configuration for SendBird
export interface SendBirdConfig {
  appId: string;
  userId: string;
}

// Widget configuration
export interface ChatWidgetProps {
  onClose?: () => void;
}
export interface ChatWidgetConfig extends SendBirdConfig {
  onChannelChanged?: (channel: ChannelType) => void;
  onMessageReceived?: (message: unknown) => void;
  onUserConnected?: (user: unknown) => void;
  onUserDisconnected?: (user: unknown) => void;
}

// Individual component props
export interface ChatIconProps {
  unreadCount?: number;
  onClick?: () => void;
  showBadge?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export type ChannelType = GroupChannel;

export interface ChatListProps {
  config: SendBirdConfig;
  onChannelSelect?: (channel: ChannelType) => void;
  className?: string;
}

export interface ChannelListProps {
  onChannelSelect?: (channel: ChannelType) => void;
  className?: string;
  onClose?: () => void;
}

export interface ChatWindowProps {
  channelUrl?: string;
}

export interface ChatWidgetContextType {
  unReactiveOpenChats: React.RefObject<string[]>;
}

// Provider props
export interface ChatWidgetProviderProps {
  children: React.ReactNode;
  config: ChatWidgetConfig;
}
