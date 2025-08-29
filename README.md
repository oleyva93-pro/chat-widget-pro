# Chat Widget SendBird

A professional, modular chat widget built with SendBird UI Kit and React. This package provides a complete chat solution with individual components for maximum flexibility.

## 🚀 Features

- ✅ **Real-time chat** with SendBird
- ✅ **Modular architecture** - use individual components or the complete widget
- ✅ **Multiple chat windows** simultaneously with drag and resize
- ✅ **Chat history** with external API integration
- ✅ **Unread messages tracking** with favicon updates
- ✅ **Sound and notification controls**
- ✅ **Channel management** (join, freeze, unfreeze)
- ✅ **TypeScript** support with full type definitions
- ✅ **Tailwind CSS** styling included
- ✅ **React 18+ and 19+** compatible
- ✅ **Customizable themes** and styling

## 📦 Installation

```bash
npm install chat-widget-sendbird
```

### Peer Dependencies

This package requires React 18+ or 19+ as peer dependencies:

```bash
npm install react react-dom
```

## 🎯 Quick Start

### Basic Usage with Provider

```tsx
import React from 'react';
import { ChatWidget, ChatWidgetProvider } from 'chat-widget-sendbird';

function App() {
  const config = {
    appId: "YOUR_SENDBIRD_APP_ID",
    userId: "unique-user-123",
    nickname: "User Name",
    profileUrl: "https://example.com/avatar.jpg",
    withSound: true,
    withNotification: true,
  };

  return (
    <ChatWidgetProvider config={config}>
      <ChatWidget />
    </ChatWidgetProvider>
  );
}
```

### Advanced Usage with All Components

```tsx
import React from 'react';
import { 
  ChatWidget, 
  ChatList, 
  ChatHistory,
  FaviconUpdater,
  ChatWidgetProvider 
} from 'chat-widget-sendbird';

function App() {
  const config = {
    appId: "YOUR_SENDBIRD_APP_ID",
    userId: "unique-user-123",
    nickname: "User Name",
    profileUrl: "https://example.com/avatar.jpg",
    withSound: true,
    withNotification: true,
    logger: (message, type) => {
      console.log(`[${type}] ${message}`);
    },
  };

  return (
    <ChatWidgetProvider config={config}>
      <div className="flex flex-row h-screen">
        <div className="fixed right-0 top-0 h-screen">
          <ChatList />
        </div>
        <ChatWidget />
        <ChatHistory
          externalHistoryUrl="https://your-api.com/chat/history"
          externalToken={() => "Bearer YOUR_TOKEN"}
        />
        <FaviconUpdater
          faviconAppUrl="favicon.ico"
          faviconUnreadAppUrl="favicon-alert.ico"
          faviconId="favicon"
        />
      </div>
    </ChatWidgetProvider>
  );
}
```

## 🧩 Components

### Main Components

#### `ChatWidget`
The main chat widget component that renders multiple chat windows with drag and resize functionality.

```tsx
import { ChatWidget } from 'chat-widget-sendbird';

<ChatWidget />
```

#### `ChatList`
A list component that displays available channels with search functionality.

```tsx
import { ChatList } from 'chat-widget-sendbird';

<ChatList 
  onChannelSelect={(channel) => console.log('Selected:', channel)}
  onClose={() => console.log('List closed')}
  className="custom-class"
/>
```

#### `ChatHistory`
A component for displaying chat history from external APIs.

```tsx
import { ChatHistory } from 'chat-widget-sendbird';

<ChatHistory
  externalHistoryUrl="https://your-api.com/chat/history"
  externalToken={() => "Bearer YOUR_TOKEN"}
/>
```

#### `FaviconUpdater`
Automatically updates the favicon based on unread message count.

```tsx
import { FaviconUpdater } from 'chat-widget-sendbird';

<FaviconUpdater
  faviconAppUrl="favicon.ico"
  faviconUnreadAppUrl="favicon-alert.ico"
  faviconId="favicon"
/>
```

#### `ChatWidgetProvider`
Context provider that manages chat state and SendBird configuration.

```tsx
import { ChatWidgetProvider } from 'chat-widget-sendbird';

<ChatWidgetProvider config={config}>
  {/* Your chat components */}
</ChatWidgetProvider>
```

## 🎣 Hooks

### `useChatWidget`
Hook to access chat widget context and state management.

```tsx
import { useChatWidget } from 'chat-widget-sendbird';

function MyComponent() {
  const {
    channels,
    maximizedChannels,
    minimizedChannels,
    handleSelection,
    handleCloseChat,
    handleMinimizeChat,
    handleCloseAllChats,
    handleOpenChat,
    handleJoinChannel,
    handleFreezeChannel,
    handleUnfreezeChannel,
    handleToggleSound,
    handleToggleNotification,
    state,
    handleDisconnect,
    handleConnect,
    logger
  } = useChatWidget();

  return (
    <div>
      <p>Open channels: {maximizedChannels.length}</p>
      <p>Sound enabled: {state.withSound ? 'Yes' : 'No'}</p>
      <button onClick={handleCloseAllChats}>Close All</button>
      <button onClick={handleToggleSound}>Toggle Sound</button>
    </div>
  );
}
```

### `useUnreadMessages`
Hook to track unread message count.

```tsx
import { useUnreadMessages } from 'chat-widget-sendbird';

function UnreadBadge() {
  const unreadCount = useUnreadMessages();

  return unreadCount > 0 ? <span>{unreadCount}</span> : null;
}
```

## ⚙️ Configuration

### SendBirdConfig
Base configuration for SendBird connection.

```tsx
interface SendBirdConfig {
  appId: string;        // Required: Your SendBird App ID
  userId: string;       // Required: Unique user identifier
}
```

### ChatWidgetConfig
Extended configuration with all available options.

```tsx
interface ChatWidgetConfig extends SendBirdConfig {
  nickname?: string;    // Optional: User display name
  profileUrl?: string;  // Optional: User profile image URL
  withSound?: boolean;  // Optional: Enable sound notifications (default: true)
  withNotification?: boolean; // Optional: Enable browser notifications (default: true)
  logger?: (message: string, type: "error" | "warn" | "info" | "debug") => void; // Optional: Custom logger
}
```

### Example Configuration

```tsx
const config = {
  appId: "YOUR_SENDBIRD_APP_ID",
  userId: "unique-user-123",
  nickname: "John Doe",
  profileUrl: "https://example.com/avatar.jpg",
  withSound: true,
  withNotification: true,
  logger: (message, type) => {
    // Custom logging implementation
    console.log(`[${type.toUpperCase()}] ${message}`);
  }
};
```

## 📋 Types

The package exports comprehensive TypeScript types:

```tsx
import type {
  SendBirdConfig,
  ChatWidgetConfig,
  ChatWidgetProviderProps,
  ChatIconProps,
  ChatListProps,
  ChannelListProps,
  ChatWindowProps,
  ChatWidgetProps,
  ChannelType,
  ChannelEntry,
  ChatSize,
  ChannelStatus,
  ProfileImageProps,
  FaviconUpdaterProps,
  ChatHistoryProps,
  ChatHistoryParams,
  ChatHistoryHandle,
  ChatHistoryMessage,
  ChannelData
} from 'chat-widget-sendbird';
```

### Key Types

- `ChannelType`: Represents a SendBird group channel
- `ChannelEntry`: Internal channel state with URL, key, and minimized status
- `ChatSize`: Dimensions for chat windows with default values
- `ChannelStatus`: Channel status constants (COMPLETED, PENDING, ACTIVE)
- `ChatHistoryMessage`: Structure for chat history messages
- `ChannelData`: Additional channel metadata (wo, vin, ro, creatorId)

## 🎨 Styling

### Tailwind CSS Classes

The package includes custom Tailwind classes:

- `chw-primary`: Primary color variable
- `chw-secondary`: Secondary color variable
- `chw-overlay`: Overlay color
- `shadow-chw`: Custom shadow for chat components

### Custom CSS Variables

```css
:root {
  --sendbird-light-primary-300: #742ddd;
  --sendbird-light-background-50: #ffffff;
}
```

### Customization

You can customize the appearance by overriding CSS variables or using Tailwind classes:

```tsx
<ChatList className="bg-white shadow-lg rounded-lg" />
<ChatWidget className="custom-chat-widget" />
```

## 📦 Package Structure

```
chat-widget-sendbird/
├── dist/
│   ├── index.js          # CommonJS bundle
│   ├── index.esm.js      # ES Module bundle
│   ├── index.d.ts        # TypeScript definitions
│   └── style1.css        # Compiled styles
├── src/
│   ├── components/       # React components
│   │   ├── chat/        # Chat-related components
│   │   ├── history/     # Chat history components
│   │   ├── list/        # Channel list components
│   │   └── ui/          # UI utility components
│   ├── hooks/           # Custom hooks
│   ├── providers/       # Context providers
│   ├── types/           # TypeScript types
│   └── styles/          # CSS styles
```

## 🔧 Development

### Building the Package

```bash
# Build the library
npm run build:lib

# Build CSS
npm run build:css

# Development server
npm run dev
```

### Example Development Setup

The `dev/` folder contains a complete example:

```tsx
// dev/App.tsx
import { 
  ChatList, 
  ChatWidget, 
  ChatHistory,
  FaviconUpdater,
  ChatWidgetProvider 
} from "@/index";

function App() {
  const config = {
    appId: "YOUR_SENDBIRD_APP_ID",
    userId: "user@example.com",
    nickname: "User Name",
    profileUrl: "https://example.com/avatar.jpg",
    withSound: true,
    withNotification: true,
  };

  return (
    <div className="min-h-screen bg-zinc-100">
      <ChatWidgetProvider config={config}>
        <div className="flex flex-row h-screen">
          <div className="fixed right-0 top-0 h-screen">
            <ChatList />
          </div>
          <ChatWidget />
          <ChatHistory
            externalHistoryUrl="https://your-api.com/chat/history"
            externalToken={() => "Bearer YOUR_TOKEN"}
          />
          <FaviconUpdater
            faviconAppUrl="favicon.ico"
            faviconUnreadAppUrl="favicon-alert.ico"
            faviconId="favicon"
          />
        </div>
      </ChatWidgetProvider>
    </div>
  );
}
```

## 🚀 Complete Example

```tsx
import React, { useState } from 'react';
import { 
  ChatWidget, 
  ChatList, 
  ChatHistory,
  FaviconUpdater,
  ChatWidgetProvider,
  useChatWidget 
} from 'chat-widget-sendbird';

function ChatControls() {
  const { 
    handleCloseAllChats, 
    maximizedChannels, 
    handleToggleSound,
    handleToggleNotification,
    state,
    handleDisconnect,
    handleConnect
  } = useChatWidget();
  
  return (
    <div className="p-4 bg-white border rounded-lg">
      <div className="flex flex-col gap-2">
        <p>Open channels: {maximizedChannels.length}</p>
        <p>Sound: {state.withSound ? 'ON' : 'OFF'}</p>
        <p>Notifications: {state.withNotification ? 'ON' : 'OFF'}</p>
        
        <div className="flex gap-2">
          <button 
            onClick={handleCloseAllChats}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Close All Chats
          </button>
          <button 
            onClick={handleToggleSound}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Toggle Sound
          </button>
          <button 
            onClick={handleToggleNotification}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Toggle Notifications
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const config = {
    appId: "YOUR_SENDBIRD_APP_ID",
    userId: "user-" + Date.now(),
    nickname: "Demo User",
    profileUrl: "https://example.com/avatar.jpg",
    withSound: true,
    withNotification: true,
    logger: (message, type) => {
      console.log(`[${type.toUpperCase()}] ${message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4">
        <h1 className="text-2xl font-bold">My Application</h1>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          {isOpen ? 'Close Chat' : 'Open Chat'}
        </button>
      </header>

      <ChatWidgetProvider config={config}>
        <div className="flex">
          <main className="flex-1 p-8">
            <h2 className="text-xl mb-4">Welcome to the app!</h2>
            <ChatControls />
          </main>
          
          {isOpen && (
            <div className="fixed right-0 top-0 h-screen">
              <ChatList />
            </div>
          )}
        </div>
        
        <ChatWidget />
        <ChatHistory
          externalHistoryUrl="https://your-api.com/chat/history"
          externalToken={() => "Bearer YOUR_TOKEN"}
        />
        <FaviconUpdater
          faviconAppUrl="favicon.ico"
          faviconUnreadAppUrl="favicon-alert.ico"
          faviconId="favicon"
        />
      </ChatWidgetProvider>
    </div>
  );
}

export default App;
```

## 🔍 Troubleshooting

### Common Issues

1. **SendBird not initialized**
   - Verify your `appId` is correct
   - Check browser console for errors
   - Ensure you have internet connection

2. **Styles not loading**
   - Styles are included automatically
   - If using CSS modules, import manually: `import 'chat-widget-sendbird/dist/style1.css'`

3. **TypeScript errors**
   - Make sure you're using the exported types
   - Check that React 18+ is installed

4. **Chat windows not appearing**
   - Ensure `ChatWidgetProvider` wraps your components
   - Check that channels are being selected via `ChatList`

5. **Chat history not loading**
   - Verify your `externalHistoryUrl` is accessible
   - Check that `externalToken` returns a valid token
   - Ensure CORS is properly configured on your API

## 📋 Requirements

- React 18+ or 19+
- Valid SendBird App ID
- Internet connection
- Modern browser with ES6+ support

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

- **GitHub Issues**: [Create an issue](https://github.com/oleyva93-pro/chat-widget-pro/issues)
- **SendBird Documentation**: [SendBird Docs](https://sendbird.com/docs)
- **Author**: oleyva93-pro

---

**Built with ❤️ using SendBird UI Kit and React**
