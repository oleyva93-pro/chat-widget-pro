import { ChannelSettings } from "@sendbird/uikit-react";
import ChannelSettingMenuList from "@sendbird/uikit-react/ChannelSettings/components/ChannelSettingMenuList";
import "@sendbird/uikit-react/dist/index.css";
import Header from "@sendbird/uikit-react/ui/Header";
import UserListItem from "@sendbird/uikit-react/ui/UserListItem";
import UserProfile from "@sendbird/uikit-react/ui/UserProfile";

export const ChatSettingsSection = ({
  channelUrl,
  onClose,
}: {
  channelUrl: string;
  onClose: () => void;
}) => {
  return (
    <ChannelSettings
      channelUrl={channelUrl}
      className="rounded-xl"
      renderUserProfile={(props) => <UserProfile {...props} disableMessaging />}
      renderLeaveChannel={() => <></>}
      renderUserListItem={(props) => (
        <UserListItem {...props} renderListItemMenu={() => <></>} />
      )}
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
          renderMiddle={() => <Header.Title title="Info" />}
          className="rounded-t-xl"
          renderRight={() => (
            <Header.IconButton
              type="CLOSE"
              onClick={onClose}
              renderIcon={(props) => (
                <Header.Icon {...props} width="24px" height="24px" />
              )}
            />
          )}
        />
      )}
    />
  );
};
