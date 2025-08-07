# Chat Widget SendBird

A professional, modular chat widget built with SendBird UI Kit and React. This package provides a complete chat solution with individual components for maximum flexibility.

## 🚀 Features

- ✅ **Real-time chat** with SendBird
- ✅ **Modular architecture** - use individual components or the complete widget
- ✅ **Multiple chat windows** simultaneously
- ✅ **Drag and resize** functionality
- ✅ **Unread messages tracking**
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
  };

  return (
    <ChatWidgetProvider config={config}>
      <ChatWidget />
    </ChatWidgetProvider>
  );
}
```

### Advanced Usage with Chat List

```tsx
import React from 'react';
import { ChatWidget, ChatList, ChatWidgetProvider } from 'chat-widget-sendbird';

function App() {
  const config = {
    appId: "YOUR_SENDBIRD_APP_ID",
    userId: "unique-user-123",
  };

  return (
    <ChatWidgetProvider config={config}>
      <div className="flex flex-row h-screen">
        <div className="fixed right-0 top-0 h-screen">
          <ChatList />
        </div>
        <ChatWidget />
      </div>
    </ChatWidgetProvider>
  );
}
```

## 🧩 Components

### Main Components

#### `ChatWidget`
The main chat widget component that renders multiple chat windows.

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
    handleCloseAllChats
  } = useChatWidget();

  return (
    <div>
      <p>Open channels: {maximizedChannels.length}</p>
      <button onClick={handleCloseAllChats}>Close All</button>
    </div>
  );
}
```

### `useUnreadMessages`
Hook to track unread message count.

```tsx
import { useUnreadMessages } from 'chat-widget-sendbird';

function UnreadBadge() {
  const unreadCount = useUnreadMessages({
    appId: "YOUR_APP_ID",
    userId: "user-123"
  });

  return unreadCount > 0 ? <span>{unreadCount}</span> : null;
}
```

## ⚙️ Configuration

### SendBirdConfig
Basic configuration for SendBird connection.

```tsx
interface SendBirdConfig {
  appId: string;        // Required: Your SendBird App ID
  userId: string;       // Required: Unique user identifier
}
```

### ChatWidgetConfig
Extended configuration with event handlers.

```tsx
interface ChatWidgetConfig extends SendBirdConfig {
  onChannelChanged?: (channel: ChannelType) => void;
  onMessageReceived?: (message: unknown) => void;
  onUserConnected?: (user: unknown) => void;
  onUserDisconnected?: (user: unknown) => void;
}
```

### Example Configuration

```tsx
const config = {
  appId: "YOUR_SENDBIRD_APP_ID",
  userId: "unique-user-123",
  onChannelChanged: (channel) => {
    console.log('Channel changed:', channel);
  },
  onMessageReceived: (message) => {
    console.log('Message received:', message);
  },
  onUserConnected: (user) => {
    console.log('User connected:', user);
  },
  onUserDisconnected: (user) => {
    console.log('User disconnected:', user);
  }
};
```

## 📋 Types

The package exports comprehensive TypeScript types:

```tsx
import type {
  SendBirdConfig,
  ChatWidgetConfig,
  ChatIconProps,
  ChatListProps,
  ChannelListProps,
  ChatWindowProps,
  ChatWidgetProps,
  ChatWidgetProviderProps,
  ChannelType,
  ChannelEntry,
  ChatSize,
  ChannelStatus
} from 'chat-widget-sendbird';
```

### Key Types

- `ChannelType`: Represents a SendBird group channel
- `ChannelEntry`: Internal channel state with URL, key, and minimized status
- `ChatSize`: Dimensions for chat windows
- `ChannelStatus`: Channel status constants (COMPLETED, PENDING, ACTIVE)

## 🎨 Styling

### Tailwind CSS Classes

The package includes custom Tailwind classes:

- `chw-primary`: Primary color variable
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
import { ChatList, ChatWidget, ChatWidgetProvider } from "../src/index";

function App() {
  const config = {
    appId: "3CCEC8CF-D8FD-447B-88E2-91294429F5D2",
    userId: "oleyva930424@gmail.com",
    isOpen: true,
  };

  return (
    <div className="min-h-screen bg-zinc-100">
      <ChatWidgetProvider config={config}>
        <div className="flex flex-row h-screen">
          <div className="fixed right-0 top-0 h-screen">
            <ChatList />
          </div>
          <ChatWidget />
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
  ChatWidgetProvider,
  useChatWidget 
} from 'chat-widget-sendbird';

function ChatControls() {
  const { handleCloseAllChats, maximizedChannels } = useChatWidget();
  
  return (
    <div className="p-4">
      <button 
        onClick={handleCloseAllChats}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Close All Chats ({maximizedChannels.length})
      </button>
    </div>
  );
}

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const config = {
    appId: "YOUR_SENDBIRD_APP_ID",
    userId: "user-" + Date.now(),
    onChannelChanged: (channel) => {
      console.log('Channel changed:', channel);
    },
    onMessageReceived: (message) => {
      console.log('Message received:', message);
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
