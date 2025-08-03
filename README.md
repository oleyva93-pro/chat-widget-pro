# Chat Widget SendBird

A professional chat widget built with SendBird UI Kit and React, ready to use in any web application.

## 🚀 Features

- ✅ **Real-time chat** with SendBird
- ✅ **Modern and responsive** interface
- ✅ **Multiple chat windows** simultaneously
- ✅ **Unread messages badge**
- ✅ **Flexible positioning** (bottom-right, bottom-left, top-right, top-left)
- ✅ **TypeScript** included
- ✅ **Styles included** automatically
- ✅ **Easy integration** in any React project

## 📦 Installation

```bash
npm install chat-widget-sendbird
```

## 🎯 Basic Usage

```tsx
import React from 'react';
import { ChatWidget } from 'chat-widget-sendbird';

function App() {
  const config = {
    appId: "YOUR_SENDBIRD_APP_ID",
    userId: "unique-user-123",
    position: "bottom-right", // bottom-right, bottom-left, top-right, top-left
    showUnreadBadge: true,
    isOpen: false
  };

  return <ChatWidget config={config} />;
}
```

## ⚙️ Configuration

### Basic Configuration

```tsx
const config = {
  appId: "YOUR_SENDBIRD_APP_ID",        // Required
  userId: "unique-user-123",            // Required
  accessToken: "optional-token",        // Optional
  position: "bottom-right",             // Optional: bottom-right, bottom-left, top-right, top-left
  showUnreadBadge: true,               // Optional: true/false
  isOpen: false,                       // Optional: true/false
  theme: "light",                      // Optional: light/dark
  language: "en"                       // Optional: en, es, etc.
};
```

### Advanced Configuration

```tsx
const config = {
  appId: "YOUR_SENDBIRD_APP_ID",
  userId: "unique-user-123",
  accessToken: "optional-token",
  position: "bottom-right",
  showUnreadBadge: true,
  isOpen: false,
  theme: "light",
  language: "en",
  customTheme: {
    // Color customization
    "--sendbird-light-primary-300": "#742ddd",
    "--sendbird-light-background-50": "#ffffff"
  },
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

## 🧩 Individual Components

### ChatIcon

```tsx
import { ChatIcon } from 'chat-widget-sendbird';

<ChatIcon
  unreadCount={5}
  onClick={() => console.log('Icon clicked')}
  showBadge={true}
  size="lg" // sm, md, lg, xl
  className="custom-class"
/>
```

### ChatList

```tsx
import { ChatList } from 'chat-widget-sendbird';

<ChatList
  config={config}
  onChannelSelect={(channel) => console.log('Channel selected:', channel)}
  className="custom-class"
/>
```

### ChannelList

```tsx
import { ChannelList } from 'chat-widget-sendbird';

<ChannelList
  config={config}
  onChannelSelect={(channel) => console.log('Channel selected:', channel)}
  className="custom-class"
/>
```

### ChatWindow

```tsx
import { ChatWindow } from 'chat-widget-sendbird';

<ChatWindow
  config={config}
  channelUrl="https://sendbird.com/channels/123"
  className="custom-class"
/>
```

## 🎨 Customization

### CSS Styles

Styles are included automatically, but you can customize them:

```css
/* Customize the widget */
.chat-widget-container {
  font-family: 'Your Font', sans-serif;
}

/* Customize the icon */
.chat-icon {
  background-color: #your-color !important;
}

/* Customize the badge */
.unread-badge {
  background-color: #ff0000 !important;
}
```

### Themes

```tsx
// Light theme (default)
const lightConfig = {
  ...config,
  theme: "light"
};

// Dark theme
const darkConfig = {
  ...config,
  theme: "dark"
};
```

## 🔧 Troubleshooting

### Error: "Instance ID is missing"

**Cause:** SendBird is not initialized correctly.

**Solution:**
1. Verify that your `appId` is valid
2. Make sure the `userId` is unique
3. Check the browser console for more details

### Error: "SendBird SDK not found"

**Cause:** SendBird SDK is not loaded.

**Solution:**
1. Check your internet connection
2. Make sure you're using the latest version of the package
3. Clear browser cache

### Styles not loading

**Cause:** SendBird styles are not imported.

**Solution:**
1. Styles are included automatically
2. If you use CSS modules, make sure to import styles manually:

```tsx
import 'chat-widget-sendbird/dist/style.css';
```

## 📋 Requirements

- React 18+ or 19+
- Valid SendBird App ID
- Internet connection

## 🚀 Complete Example

```tsx
import React, { useState } from 'react';
import { ChatWidget, ChatWidgetProvider } from 'chat-widget-sendbird';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const config = {
    appId: "2D7B4CDB-932F-4AE2-8FE9-3BBEC7353A4A",
    userId: "user-" + Date.now(),
    position: "bottom-right",
    showUnreadBadge: true,
    isOpen: isOpen,
    onChannelChanged: (channel) => {
      console.log('Channel changed:', channel);
    },
    onMessageReceived: (message) => {
      console.log('Message received:', message);
    }
  };

  return (
    <div>
      <h1>My Application with Chat</h1>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Close Chat' : 'Open Chat'}
      </button>
      
      <ChatWidgetProvider config={config}>
        <ChatWidget />
      </ChatWidgetProvider>
    </div>
  );
}

export default App;
```

## 📄 License

MIT

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you have problems or questions:

1. Check the [SendBird documentation](https://sendbird.com/docs)
2. Open an issue on GitHub
3. Contact the author: oleyva93-pro

---

**Enjoy using the Chat Widget SendBird! 🎉**
