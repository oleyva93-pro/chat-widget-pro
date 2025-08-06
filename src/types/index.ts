import type { GroupChannel } from "@sendbird/chat/groupChannel";
import type React from "react";

// Base configuration for SendBird
export interface SendBirdConfig {
  appId: string;
  userId: string;
}

// Widget configuration
export interface ChatWidgetProps {
  key?: string;
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

export type ChannelType = GroupChannel | null;

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

export interface ChatListItemProps {
  channel: GroupChannel;
  className?: string;
}

export interface ChatListHeaderProps {
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose?: () => void;
  className?: string;
  searchValue?: string;
}

export interface ChatWindowProps {
  channelUrl?: string;
  index: number;
  onCloseChat?: () => void;
  onMinimizeChat?: () => void;
  minimized?: boolean;
}

export interface ChannelEntry {
  url: string;
  minimized?: boolean;
  key: string;
}

export interface ChatWidgetContextType {
  channels: ChannelEntry[];
  maximizedChannels: ChannelEntry[];
  minimizedChannels: ChannelEntry[];
  handleSelection: (channel: ChannelType) => void;
  handleCloseChat: (url: string) => void;
  handleMinimizeChat: (url: string) => void;
  handleCloseAllChats: () => void;
}

// Provider props
export interface ChatWidgetProviderProps {
  children: React.ReactNode;
  config: ChatWidgetConfig;
}

export interface ChatSize {
  width: number;
  height: number;
}

export const ChannelStatus = {
  COMPLETED: "completed",
  PENDING: "pending",
  ACTIVE: "active",
} as const;

export const DEFAULT_CHAT_SIZE = {
  width: 330,
  height: 500,
  gap: 20,
  minWidth: 300,
  maxWidth: 800,
  minHeight: 300,
  maxHeight: 800,
} as const;

export interface ProfileImageProps {
  profileUrl: string;
  nickname: string;
  height?: number;
  width?: number;
  fontSize?: number;
}
