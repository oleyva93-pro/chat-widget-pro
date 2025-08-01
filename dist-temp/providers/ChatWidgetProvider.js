import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useCallback } from "react";
import { ChatWidgetContext } from "../context/ChatWidgetContext";
export const ChatWidgetProvider = ({ children, isOpen = false, onChannelChanged, }) => {
    const [state, setState] = useState({
        isOpen,
        selectedChannel: null,
        unreadCount: 0,
        isConnected: false,
    });
    const toggleChat = useCallback(() => {
        setState((prev) => ({ ...prev, isOpen: !prev.isOpen }));
    }, []);
    const selectChannel = useCallback((channel) => {
        setState((prev) => ({ ...prev, selectedChannel: channel }));
        onChannelChanged?.(channel);
    }, [onChannelChanged]);
    const updateUnreadCount = useCallback((count) => {
        setState((prev) => ({ ...prev, unreadCount: count }));
    }, []);
    const setConnected = useCallback((connected) => {
        setState((prev) => ({ ...prev, isConnected: connected }));
    }, []);
    const contextValue = {
        state,
        toggleChat,
        selectChannel,
        updateUnreadCount,
        setConnected,
    };
    return (_jsx(ChatWidgetContext.Provider, { value: contextValue, children: children }));
};
