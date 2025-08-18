import { ChannelSettings, useSendbird } from "@sendbird/uikit-react";
import ChannelSettingMenuList from "@sendbird/uikit-react/ChannelSettings/components/ChannelSettingMenuList";
import Header from "@sendbird/uikit-react/ui/Header";
import UserListItem from "@sendbird/uikit-react/ui/UserListItem";
import UserProfile from "@sendbird/uikit-react/ui/UserProfile";
import { ArrowLeft } from "lucide-react";

import { useChannelData, useChannelMetadata } from "../../hooks/use-channel";
import { ChatLeftHeader } from "./header/chat-left-header";

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
    <div className="allow-drag cursor-grab">
      <ChannelSettings
        channelUrl={channelUrl}
        className="rounded-xl"
        renderChannelProfile={() => <ChatLeftHeader className="p-4" />}
        renderLeaveChannel={showLeaveButton ? undefined : () => <></>}
        renderUserListItem={(props) => (
          <UserListItem {...props} renderListItemMenu={() => <></>} />
        )}
        renderUserProfile={(props) => (
          <UserProfile {...props} disableMessaging />
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
            renderMiddle={() => (
              <div className="flex items-center justify-between gap-2">
                <div
                  className="rounded-full p-1 hover:bg-gray-100 cursor-pointer"
                  onTouchStart={onClose}
                  onClick={onClose}
                >
                  <ArrowLeft
                    className="w-5.5 h-5.5 text-chw-primary"
                    strokeWidth={2.8}
                  />
                </div>
                <Header.Title title="Chat Information" />
              </div>
            )}
            className="rounded-t-xl"
          />
        )}
      />
    </div>
  );
};
