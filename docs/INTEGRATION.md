# Chat Widget Integration Guide

This guide explains how to integrate the chat widget into your React application.

## Installation

```bash
npm install @your-company/chat-widget
```

## Basic Integration

### 1. Import the Components

```tsx
import { ChatWidgetProvider, ChatWidget } from '@your-company/chat-widget';
```

### 2. Configure SendBird

First, you need to set up your SendBird application:

1. Go to [SendBird Dashboard](https://dashboard.sendbird.com/)
2. Create a new application or use an existing one
3. Get your Application ID from the dashboard
4. Configure your application settings

### 3. Basic Implementation

```tsx
import React from 'react';
import { ChatWidgetProvider, ChatWidget } from '@your-company/chat-widget';

function App() {
  const config = {
    appId: 'YOUR_SENDBIRD_APP_ID',
    userId: 'user123',
    theme: 'light',
    position: 'bottom-right',
    showUnreadBadge: true,
  };

  return (
    <ChatWidgetProvider {...config}>
      <div className="App">
        <h1>My Application</h1>
        <ChatWidget config={config} />
      </div>
    </ChatWidgetProvider>
  );
}
```

## Advanced Configuration

### Full Configuration Options

```tsx
const config = {
  // Required
  appId: 'YOUR_SENDBIRD_APP_ID',
  userId: 'user123',
  
  // Optional
  accessToken: 'optional_access_token',
  theme: 'light' | 'dark',
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left',
  showUnreadBadge: true,
  language: 'en',
  
  // Custom theme
  customTheme: {
    '--sendbird-light-primary-500': '#3B82F6',
    '--sendbird-light-primary-600': '#2563EB',
  },
  
  // Event handlers
  onMessageReceived: (message) => {
    console.log('New message:', message);
  },
  onChannelChanged: (channel) => {
    console.log('Channel changed:', channel);
  },
  onUserConnected: (user) => {
    console.log('User connected:', user);
  },
  onUserDisconnected: (user) => {
    console.log('User disconnected:', user);
  },
};
```

### Using Individual Components

You can also use individual components for more control:

```tsx
import { 
  ChatIcon, 
  useChatWidget 
} from '@your-company/chat-widget';

function CustomChatInterface() {
  const { state, toggleChat } = useChatWidget();

  return (
    <div>
      <ChatIcon 
        unreadCount={state.unreadCount}
        onClick={toggleChat}
        size="lg"
      />
      
      {state.isOpen && (
        <div className="chat-container">
          {/* Your custom chat interface */}
        </div>
      )}
    </div>
  );
}
```

## Styling

### Custom CSS Classes

```tsx
<ChatWidget 
  config={config} 
  className="custom-chat-widget" 
/>
```

### Tailwind CSS Integration

The widget uses Tailwind CSS. Make sure your project includes Tailwind CSS:

```bash
npm install tailwindcss
```

### Custom Themes

```tsx
const config = {
  // ... other config
  customTheme: {
    '--sendbird-light-primary-500': '#3B82F6',
    '--sendbird-light-primary-600': '#2563EB',
    '--sendbird-light-background-500': '#FFFFFF',
    '--sendbird-light-background-600': '#F3F4F6',
  },
};
```

## Event Handling

### Message Events

```tsx
const config = {
  // ... other config
  onMessageReceived: (message) => {
    // Handle new message
    console.log('New message received:', message);
    
    // You can update your app state here
    setUnreadCount(prev => prev + 1);
  },
};
```

### Channel Events

```tsx
const config = {
  // ... other config
  onChannelChanged: (channel) => {
    // Handle channel selection
    console.log('Channel selected:', channel);
    
    // You can update your app state here
    setCurrentChannel(channel);
  },
};
```

## Troubleshooting

### Common Issues

1. **Widget not appearing**: Make sure the `ChatWidgetProvider` wraps your entire application
2. **SendBird connection issues**: Verify your App ID and user authentication
3. **Styling issues**: Ensure Tailwind CSS is properly configured
4. **TypeScript errors**: Make sure you're using the latest version of TypeScript

### Debug Mode

Enable debug logging:

```tsx
const config = {
  // ... other config
  debug: true, // Enable debug logging
};
```

## Best Practices

1. **User Authentication**: Always authenticate users before initializing the widget
2. **Error Handling**: Implement proper error handling for network issues
3. **Performance**: Use React.memo for custom components if needed
4. **Accessibility**: Ensure your custom components are accessible
5. **Mobile Responsiveness**: Test on various screen sizes

## Support

For support and questions:

- Create an issue in this repository
- Email: support@your-company.com
- Documentation: [Link to full documentation] 