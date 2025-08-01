export interface SendBirdConfig {
    appId: string;
    userId: string;
    accessToken?: string;
    theme?: "light" | "dark";
    customTheme?: Record<string, any>;
    language?: string;
}
export interface ChatWidgetConfig extends SendBirdConfig {
    position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
    showUnreadBadge?: boolean;
    isOpen?: boolean;
    onChannelChanged?: (channel: any) => void;
    onMessageReceived?: (message: any) => void;
    onUserConnected?: (user: any) => void;
    onUserDisconnected?: (user: any) => void;
}
export interface ChatIconProps {
    unreadCount?: number;
    onClick?: () => void;
    showBadge?: boolean;
    size?: "sm" | "md" | "lg" | "xl";
    className?: string;
}
export interface ChatListProps {
    config: SendBirdConfig;
    onChannelSelect?: (channel: any) => void;
    className?: string;
}
export interface ChannelListProps {
    config: SendBirdConfig;
    onChannelSelect?: (channel: any) => void;
    className?: string;
}
export interface ChatWindowProps {
    config: SendBirdConfig;
    channelUrl?: string;
    className?: string;
}
export interface ChatWidgetProps {
    config: ChatWidgetConfig;
    className?: string;
}
export interface ChatWidgetState {
    isOpen: boolean;
    selectedChannel: any;
    unreadCount: number;
    isConnected: boolean;
}
export interface ChatWidgetProviderProps {
    children: React.ReactNode;
    config: SendBirdConfig;
    isOpen?: boolean;
    onChannelChanged?: (channel: any) => void;
}
//# sourceMappingURL=index.d.ts.map