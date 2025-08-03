# Usage Examples - Modular Chat Widget

## 🎯 Common Use Cases

### 1. Complete Widget (Basic Usage)

```tsx
import { ChatWidgetProvider, ChatWidget } from '@your-company/chat-widget';

function App() {
  const config = {
    appId: "YOUR_SENDBIRD_APP_ID",
    userId: "YOUR_USER_ID",
    position: "bottom-right",
    showUnreadBadge: true,
  };

  return (
    <ChatWidgetProvider config={config}>
      <ChatWidget />
    </ChatWidgetProvider>
  );
}
```

### 2. Chat Icon Only

```tsx
import { ChatIcon } from '@your-company/chat-widget';

function Header() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <header className="flex items-center justify-between p-4">
      <h1>My Application</h1>
      <ChatIcon
        unreadCount={unreadCount}
        onClick={() => setIsChatOpen(!isChatOpen)}
        size="md"
        showBadge={true}
      />
    </header>
  );
}
```

### 3. Custom Chat List

```tsx
import { ChatList } from '@your-company/chat-widget';

function ChatSidebar() {
  const config = {
    appId: "YOUR_SENDBIRD_APP_ID",
    userId: "YOUR_USER_ID",
  };

  const handleChannelSelect = (channel) => {
    console.log('Selected channel:', channel);
    // Navigate to chat or open in new window
  };

  return (
    <aside className="w-80 bg-white border-r">
      <ChatList
        config={config}
        onChannelSelect={handleChannelSelect}
        className="h-full"
      />
    </aside>
  );
}
```

### 4. Independent Chat Window

```tsx
import { ChatWindow } from '@your-company/chat-widget';

function ChatPage() {
  const config = {
    appId: "YOUR_SENDBIRD_APP_ID",
    userId: "YOUR_USER_ID",
  };

  const [selectedChannel, setSelectedChannel] = useState(null);

  return (
    <div className="h-screen flex">
      {/* Sidebar with channel list */}
      <div className="w-80 border-r">
        <ChannelList
          config={config}
          onChannelSelect={(channel) => setSelectedChannel(channel)}
        />
      </div>

      {/* Chat area */}
      <div className="flex-1">
        <ChatWindow
          config={config}
          channelUrl={selectedChannel?.url}
          className="h-full"
        />
      </div>
    </div>
  );
}
```

### 5. Widget with Custom State

```tsx
import { ChatWidgetProvider, useChatWidget, ChatIcon } from '@your-company/chat-widget';

function CustomChatWidget() {
  const config = {
    appId: "YOUR_SENDBIRD_APP_ID",
    userId: "YOUR_USER_ID",
  };

  return (
    <ChatWidgetProvider config={config}>
      <CustomChatInterface />
    </ChatWidgetProvider>
  );
}

function CustomChatInterface() {
  const { state, toggleChat, selectChannel } = useChatWidget();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <ChatIcon
        unreadCount={state.unreadCount}
        onClick={toggleChat}
        size="lg"
      />
      
      {state.isOpen && (
        <div className="mt-4 bg-white rounded-lg shadow-xl w-96 h-[600px]">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">Chat</h3>
          </div>
          
          <div className="flex h-full">
            <div className="w-1/2 border-r">
              <ChatList
                config={config}
                onChannelSelect={selectChannel}
              />
            </div>
            
            <div className="w-1/2">
              {state.selectedChannel ? (
                <ChatWindow
                  config={config}
                  channelUrl={state.selectedChannel.url}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  Select a channel to chat
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

### 6. Multiple Chat Windows

```tsx
import { ChatWindow } from '@your-company/chat-widget';

function MultiChatInterface() {
  const config = {
    appId: "YOUR_SENDBIRD_APP_ID",
    userId: "YOUR_USER_ID",
  };

  const [openChats, setOpenChats] = useState([]);

  const openChat = (channel) => {
    setOpenChats(prev => [...prev, channel]);
  };

  const closeChat = (channelUrl) => {
    setOpenChats(prev => prev.filter(chat => chat.url !== channelUrl));
  };

  return (
    <div className="h-screen flex">
      {/* Channel list */}
      <div className="w-80 border-r">
        <ChatList
          config={config}
          onChannelSelect={openChat}
        />
      </div>

      {/* Multiple chat windows */}
      <div className="flex-1 flex flex-wrap gap-4 p-4 overflow-auto">
        {openChats.map((chat) => (
          <div key={chat.url} className="relative w-[400px] h-[500px] border rounded-lg">
            <button
              onClick={() => closeChat(chat.url)}
              className="absolute top-2 right-2 z-10 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              ×
            </button>
            <ChatWindow
              config={config}
              channelUrl={chat.url}
              className="h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 7. Unread Messages Hook

```tsx
import { useUnreadMessages } from '@your-company/chat-widget';

function NotificationBadge() {
  const config = {
    appId: "YOUR_SENDBIRD_APP_ID",
    userId: "YOUR_USER_ID",
  };

  const unreadCount = useUnreadMessages(config);

  if (unreadCount === 0) return null;

  return (
    <div className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">
      {unreadCount} new messages
    </div>
  );
}
```

### 8. React Router Integration

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChatWidgetProvider, ChatWindow } from '@your-company/chat-widget';

function App() {
  const config = {
    appId: "YOUR_SENDBIRD_APP_ID",
    userId: "YOUR_USER_ID",
  };

  return (
    <ChatWidgetProvider config={config}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat/:channelUrl" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </ChatWidgetProvider>
  );
}

function ChatPage() {
  const { channelUrl } = useParams();
  
  return (
    <div className="h-screen">
      <ChatWindow
        config={config}
        channelUrl={channelUrl}
        className="h-full"
      />
    </div>
  );
}
```

## 🎨 Advanced Customization

### Custom Theme

```tsx
const config = {
  appId: "YOUR_SENDBIRD_APP_ID",
  userId: "YOUR_USER_ID",
  theme: "dark",
  customTheme: {
    '--sendbird-light-primary-500': '#3B82F6',
    '--sendbird-light-primary-600': '#2563EB',
    '--sendbird-light-background-50': '#F8FAFC',
  },
};
```

### Custom Positions

```tsx
// Widget in top-left corner
<ChatWidget config={{ ...config, position: "top-left" }} />

// Widget in center of screen
<div className="fixed inset-0 flex items-center justify-center z-50">
  <ChatWidget config={config} className="relative" />
</div>
```

### Custom Styles

```tsx
<ChatIcon
  unreadCount={5}
  onClick={toggleChat}
  className="custom-chat-icon"
  size="xl"
/>

// Custom CSS
.custom-chat-icon {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
}

.custom-chat-icon:hover {
  transform: scale(1.1);
}
```

## 🔧 Advanced Configuration

### Event Callbacks

```tsx
const config = {
  appId: "YOUR_SENDBIRD_APP_ID",
  userId: "YOUR_USER_ID",
  onMessageReceived: (message) => {
    // Show push notification
    showNotification('New message', message.message);
  },
  onChannelChanged: (channel) => {
    // Update URL or state
    navigate(`/chat/${channel.url}`);
  },
  onUserConnected: (user) => {
    console.log('User connected:', user);
  },
  onUserDisconnected: (user) => {
    console.log('User disconnected:', user);
  },
};
```

### Error Handling

```tsx
function ChatWithErrorHandling() {
  const [error, setError] = useState(null);

  const config = {
    appId: "YOUR_SENDBIRD_APP_ID",
    userId: "YOUR_USER_ID",
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">Connection error: {error}</p>
        <button 
          onClick={() => setError(null)}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <ChatWidgetProvider config={config}>
      <ChatWidget config={config} />
    </ChatWidgetProvider>
  );
}
``` 