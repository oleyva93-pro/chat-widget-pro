# Styles Guide - SendBird UI Kit

## 🎨 Automatically Included Styles

The `chat-widget-sendbird` package automatically includes all necessary SendBird UI Kit styles. **You don't need to import anything additional**.

## ✅ Correct Usage

```tsx
// ✅ CORRECT - Styles are imported automatically
import { ChatWidget, ChatWidgetProvider } from 'chat-widget-sendbird';

function App() {
  const config = {
    appId: "YOUR_SENDBIRD_APP_ID",
    userId: "YOUR_USER_ID",
  };

  return (
    <ChatWidgetProvider config={config}>
      <ChatWidget config={config} />
    </ChatWidgetProvider>
  );
}
```

## ❌ Incorrect Usage

```tsx
// ❌ INCORRECT - No need to import styles manually
import '@sendbird/uikit-react/dist/index.css'; // ❌ Don't do this
import { ChatWidget } from 'chat-widget-sendbird';
```

## 🔧 How It Works

### 1. Styles Included in the Package

SendBird UI Kit styles are processed and packaged together with the JavaScript code:

```css
/* This is automatically included in the package */
@import "@sendbird/uikit-react/dist/index.css";

/* Additional widget styles */
.chat-widget-container {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### 2. Automatic Import

When you import any component from the package, styles are loaded automatically:

```tsx
// You only need this
import { ChatWidget } from 'chat-widget-sendbird';

// Styles are loaded automatically in the background
```

## 🎨 Style Customization

### SendBird CSS Variables

You can customize colors and styles by overriding SendBird's CSS variables:

```css
/* In your global CSS file */
:root {
  /* Primary colors */
  --sendbird-light-primary-500: #3B82F6;
  --sendbird-light-primary-600: #2563EB;
  --sendbird-light-primary-700: #1D4ED8;
  
  /* Background colors */
  --sendbird-light-background-50: #F8FAFC;
  --sendbird-light-background-100: #F1F5F9;
  --sendbird-light-background-200: #E2E8F0;
  
  /* Text colors */
  --sendbird-light-onlight-01: #1E293B;
  --sendbird-light-onlight-02: #475569;
  --sendbird-light-onlight-03: #64748B;
  
  /* Border colors */
  --sendbird-light-ondark-01: #FFFFFF;
  --sendbird-light-ondark-02: #F1F5F9;
  --sendbird-light-ondark-03: #E2E8F0;
}
```

### Dark Theme

To use the dark theme, configure the theme in the component:

```tsx
const config = {
  appId: "YOUR_SENDBIRD_APP_ID",
  userId: "YOUR_USER_ID",
  theme: "dark", // Switch to dark theme
};

<ChatWidget config={config} />
```

### Custom Styles

You can add custom styles using the `className` prop:

```tsx
<ChatWidget 
  config={config} 
  className="custom-chat-widget"
/>

// In your CSS
.custom-chat-widget {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
}
```

## 🔍 Troubleshooting

### Styles not loading

1. **Verify you're using the correct version of the package**
2. **Don't manually import SendBird styles**
3. **Make sure the package is installed correctly**

```bash
# Reinstall the package
npm uninstall chat-widget-sendbird
npm install chat-widget-sendbird
```

### Styles look different

1. **Check for conflicts with other styles**
2. **Use CSS variables for customization**
3. **Make sure Tailwind CSS is configured correctly**

### Performance issues

1. **Styles are loaded only once**
2. **The package is optimized for production**
3. **Styles are automatically tree-shaken**

## 📦 Package Structure

```
chat-widget-sendbird/
├── dist/
│   ├── index.js          # CommonJS bundle
│   ├── index.esm.js      # ES Module bundle
│   ├── index.umd.js      # UMD bundle
│   ├── style.css         # Processed styles
│   └── index.d.ts        # TypeScript definitions
└── package.json
```

## 🚀 Best Practices

### 1. Single Import

```tsx
// ✅ Correct
import { ChatWidget, ChatWidgetProvider } from 'chat-widget-sendbird';

// ❌ Incorrect - Multiple imports
import { ChatWidget } from 'chat-widget-sendbird';
import { ChatWidgetProvider } from 'chat-widget-sendbird';
```

### 2. Centralized Configuration

```tsx
// ✅ Correct - Reusable configuration
const sendBirdConfig = {
  appId: "YOUR_SENDBIRD_APP_ID",
  userId: "YOUR_USER_ID",
  theme: "light",
};

<ChatWidgetProvider config={sendBirdConfig}>
  <ChatWidget config={sendBirdConfig} />
</ChatWidgetProvider>
```

### 3. Style Customization

```tsx
// ✅ Correct - Use className for custom styles
<ChatWidget 
  config={config} 
  className="my-custom-chat-widget"
/>

// ❌ Incorrect - Don't override styles directly
<ChatWidget 
  config={config} 
  style={{ /* don't do this */ }}
/>
```

## 🔧 Local Development

If you're developing locally and want to see the styles:

1. **Clone the repository**
2. **Install dependencies**
3. **Run the development server**

```bash
git clone https://github.com/oleyva93-pro/chat-widget-pro
cd chat-widget-pro
npm install
npm run dev
```

Styles will be loaded automatically in the development server.

## 📚 Additional Resources

- [SendBird UI Kit Documentation](https://sendbird.com/docs/uikit/v3/react/overview)
- [SendBird Customization Guide](https://sendbird.com/docs/uikit/v3/react/guides/theming)
- [SendBird CSS Variables](https://sendbird.com/docs/uikit/v3/react/guides/theming#css-variables) 