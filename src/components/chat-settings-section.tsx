import { ChannelSettings, useSendbird } from "@sendbird/uikit-react";
import ChannelSettingMenuList from "@sendbird/uikit-react/ChannelSettings/components/ChannelSettingMenuList";
import "@sendbird/uikit-react/dist/index.css";
import Header from "@sendbird/uikit-react/ui/Header";
import UserListItem from "@sendbird/uikit-react/ui/UserListItem";
import UserProfile from "@sendbird/uikit-react/ui/UserProfile";
import { X } from "lucide-react";

import { useChannelData, useChannelMetadata } from "../hooks/use-channel";
import { ChatLeftHeader } from "./chat-left-header";

export const ChatSettingsSection = ({
  channelUrl,
  onClose,
}: {
  channelUrl: string;
  onClose: () => void;
}) => {
  const { state } = useSendbird();
  const { channel } = useChannelData();
  const { data: channelMetadata } = useChannelMetadata();

  const currentUser = state.config.userId;
  const operators = channel?.creator?.userId;
  const technicians = channelMetadata?.associatedTechnician;

  const showLeaveButton =
    currentUser !== operators && currentUser !== technicians;

  return (
    <ChannelSettings
      channelUrl={channelUrl}
      className="rounded-xl"
      renderChannelProfile={() => <ChatLeftHeader className="p-4" />}
      renderLeaveChannel={showLeaveButton ? undefined : () => <></>}
      renderUserListItem={(props) => (
        <UserListItem {...props} renderListItemMenu={() => <></>} />
      )}
      renderUserProfile={(props) => <UserProfile {...props} disableMessaging />}
      renderModerationPanel={(props) => (
        <ChannelSettingMenuList
          {...props}
          menuItems={{
            ...props.menuItems,
            operator: {
              ...props.menuItems.operator,
              bannedUsers: {
                ...props.menuItems.operator.bannedUsers,
                hideMenu: true,
              },
              mutedUsers: {
                ...props.menuItems.operator.mutedUsers,
                hideMenu: true,
              },
              freezeChannel: {
                ...props.menuItems.operator.freezeChannel,
                hideMenu: true,
              },
            },
          }}
        />
      )}
      renderHeader={() => (
        <Header
          renderMiddle={() => <Header.Title title="Chat Information" />}
          className="rounded-t-xl"
          renderRight={() => (
            <Header.IconButton
              type="CLOSE"
              onClick={onClose}
              renderIcon={() => (
                <X className="w-5.5 h-5.5 text-primary" strokeWidth={2.8} />
              )}
            />
          )}
        />
      )}
    />
  );
};
