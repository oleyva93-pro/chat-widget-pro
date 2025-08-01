import { jsx as _jsx } from "react/jsx-runtime";
import "@sendbird/uikit-react/dist/index.css";
import { GroupChannelList } from "@sendbird/uikit-react/GroupChannelList";
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
export const ChannelList = ({ config, onChannelSelect, className = "", }) => {
    return (_jsx(SendbirdProvider, { appId: config.appId, userId: config.userId, accessToken: config.accessToken, sdkInitParams: {
            appStateToggleEnabled: false,
        }, children: _jsx("div", { className: `${className}`, children: _jsx(GroupChannelList, { disableAutoSelect: true, onChannelCreated: () => { }, onChannelSelect: (channel) => {
                    if (channel && onChannelSelect) {
                        onChannelSelect(channel);
                    }
                } }) }) }));
};
