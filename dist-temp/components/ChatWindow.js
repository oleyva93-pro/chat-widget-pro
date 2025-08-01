import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "@sendbird/uikit-react/dist/index.css";
import GroupChannel from "@sendbird/uikit-react/GroupChannel";
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
export const ChatWindow = ({ config, channelUrl, className = "", }) => {
    if (!channelUrl) {
        return (_jsx("div", { className: `flex items-center justify-center h-full ${className}`, children: _jsxs("div", { className: "text-center text-gray-500", children: [_jsx("h4", { className: "font-semibold text-gray-800 mb-2", children: "Selecciona un canal" }), _jsx("p", { className: "text-sm", children: "Haz clic en un canal para comenzar a chatear" })] }) }));
    }
    return (_jsx(SendbirdProvider, { appId: config.appId, userId: config.userId, accessToken: config.accessToken, sdkInitParams: {
            appStateToggleEnabled: false,
        }, children: _jsx("div", { className: `h-full ${className}`, children: _jsx(GroupChannel, { channelUrl: channelUrl }) }) }));
};
