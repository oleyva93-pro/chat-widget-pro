import { CopyIcon, MinusIcon, PlusIcon, XIcon } from "lucide-react";
import {
  ChatList,
  ChatWidget,
  ChatWidgetProvider,
  FaviconUpdater,
  useChatWidget,
  useUnreadMessages,
} from "../src/index";

function App() {
  const config = {
    appId: "3CCEC8CF-D8FD-447B-88E2-91294429F5D2",
    // userId: "oleyva930424@gmail.com",
    userId: "alberto.moguel+superadmin@astech.com",
    // userId: "technician@lighthousetech.io",

    // another app
    // appId: "362E637D-9F70-414C-A5C3-EA689A880FCC",
    // userId: "oleyva930424",
    isOpen: true,
  };

  return (
    <div className="min-h-screen bg-zinc-100">
      <ChatWidgetProvider config={config}>
        <ChatControls />
        <div className="flex flex-row h-screen z-50">
          <div className="fixed right-0 top-0 h-screen">
            <ChatList />
          </div>
          <div className="fixed top-0 right-0 w-full z-50">
            <ChatWidget />
          </div>
        </div>
        <FaviconUpdater
          faviconAppUrl="favicon.ico"
          faviconUnreadAppUrl="faviconAlert.ico"
        />
      </ChatWidgetProvider>
    </div>
  );
}

function ChatControls() {
  const {
    handleCloseAllChats,
    maximizedChannels,
    handleOpenChat,
    handleToggleSound,
    handleToggleNotification,
    handleMinimizeChat,
    handleCloseChat,
    handleJoinChannel,
    channels,
    state,
  } = useChatWidget();

  const unreadCount = useUnreadMessages();

  return (
    <div className="p-4 bg-white h-screen w-80 border">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <span>Unread messages: {unreadCount}</span>
        </div>
        <form
          className="flex flex-col gap-2 bg-gray-100 px-4 py-5 rounded-md"
          onSubmit={(e) => {
            e.preventDefault();
            const form = new FormData(e.target as HTMLFormElement);
            const chatUrl = form.get("chat-url") as string;
            if (
              chatUrl &&
              !channels.some((channel) => channel.url === chatUrl)
            ) {
              handleOpenChat(chatUrl);
            }
          }}
        >
          <label htmlFor="chat-url">Open Chat by channel URL</label>
          <input
            type="text"
            id="chat-url"
            name="chat-url"
            required
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter chat url"
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Open Chat
          </button>
        </form>
        <form
          className="flex flex-col gap-2 bg-gray-100 px-4 py-5 rounded-md"
          onSubmit={(e) => {
            e.preventDefault();
            const form = new FormData(e.target as HTMLFormElement);
            const chatUrl = form.get("chat-url") as string;
            if (
              chatUrl &&
              !channels.some((channel) => channel.url === chatUrl)
            ) {
              handleJoinChannel(chatUrl);
            }
          }}
        >
          <label htmlFor="chat-url">Join Chat by channel URL</label>
          <input
            type="text"
            id="chat-url"
            name="chat-url"
            required
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter chat url"
          />
          <button className="px-4 py-2 bg-blue-800 text-white rounded">
            Join Chat
          </button>
        </form>
        <div className="flex flex-col gap-2 bg-gray-100 px-4 py-5 rounded-md">
          <div className="flex items-center gap-2">
            <label htmlFor="sound">Sound</label>
            <input
              type="checkbox"
              id="sound"
              name="sound"
              checked={state.withSound}
              onChange={handleToggleSound}
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="notification">Notification</label>
            <input
              type="checkbox"
              id="notification"
              name="notification"
              checked={state.withNotification}
              onChange={handleToggleNotification}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 bg-gray-100 px-4 py-5 rounded-md">
          Open Channel list
          <ul className="flex flex-col gap-2">
            {channels.map((channel) => (
              <li key={channel.url} className="flex items-center gap-2">
                <span className="text-sm text-gray-500 truncate w-3/4">
                  {channel.url}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(channel.url);
                    }}
                    className="p-2 rounded-full bg-blue-500 text-white cursor-pointer flex items-center justify-center"
                  >
                    <CopyIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleMinimizeChat(channel.url)}
                    className="p-2 rounded-full bg-blue-500 text-white cursor-pointer flex items-center justify-center"
                  >
                    <MinusIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleOpenChat(channel.url)}
                    className="p-2 rounded-full bg-blue-500 text-white cursor-pointer flex items-center justify-center"
                  >
                    <PlusIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleCloseChat(channel.url)}
                    className="p-2 rounded-full bg-blue-500 text-white cursor-pointer flex items-center justify-center"
                  >
                    <XIcon className="w-4 h-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={handleCloseAllChats}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Close All Chats ({maximizedChannels.length})
        </button>
      </div>
    </div>
  );
}

export default App;
