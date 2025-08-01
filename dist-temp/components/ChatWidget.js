import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import "@sendbird/uikit-react/dist/index.css";
import { GroupChannelList } from "@sendbird/uikit-react/GroupChannelList";
import GroupChannel from "@sendbird/uikit-react/GroupChannel";
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import { ChatIcon } from "./ChatIcon";
import { useChatWidget } from "../hooks/useChatWidget";
export const ChatWidget = ({ config, className = "", }) => {
    const { state, toggleChat } = useChatWidget();
    const [channels, setChannels] = useState([]);
    const positionClasses = {
        "bottom-right": "bottom-4 right-4",
        "bottom-left": "bottom-4 left-4",
        "top-right": "top-4 right-4",
        "top-left": "top-4 left-4",
    };
    const position = config.position || "bottom-right";
    const handleSelection = (url, name) => {
        setChannels((prev) => {
            if (prev.find((t) => t.url === url))
                return prev;
            return [...prev, { url, name, key: `${url}-${Date.now()}` }];
        });
    };
    if (!state.isOpen) {
        return (_jsx("div", { className: `fixed ${positionClasses[position]} z-50 ${className}`, children: _jsx(ChatIcon, { unreadCount: state.unreadCount, onClick: toggleChat, showBadge: config.showUnreadBadge !== false, size: "lg" }) }));
    }
    return (_jsx("div", { className: `fixed ${positionClasses[position]} z-50 ${className}`, children: _jsx(SendbirdProvider, { appId: config.appId, userId: config.userId, sdkInitParams: {
                appStateToggleEnabled: false,
            }, children: _jsxs("div", { className: "bg-white rounded-lg shadow-2xl border border-gray-200 w-[800px] h-[600px] flex flex-col", children: [_jsx("div", { className: "p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-800", children: "Chat" }), _jsx("button", { onClick: toggleChat, className: "text-gray-500 hover:text-gray-700 transition-colors", children: _jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) })] }) }), _jsxs("div", { className: "flex flex-1 overflow-hidden", children: [_jsx("div", { className: "w-80 border-r border-gray-200", children: _jsx(GroupChannelList, { disableAutoSelect: true, onChannelCreated: () => { }, onChannelSelect: (c) => c && handleSelection(c.url, c.name) }) }), _jsx("div", { className: "flex-1 p-4 flex flex-wrap gap-4 overflow-auto", children: channels.map((entry) => (_jsx("div", { className: "relative w-[450px] h-[500px] border border-gray-200 rounded-lg", children: _jsx(GroupChannel, { channelUrl: entry.url }, entry.key) }, entry.key))) })] })] }) }) }));
};
