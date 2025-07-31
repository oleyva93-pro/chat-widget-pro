# Ejemplos de Uso - Chat Widget Modular

## 🎯 Casos de Uso Comunes

### 1. Widget Completo (Uso Básico)

```tsx
import { ChatWidgetProvider, ChatWidget } from '@your-company/chat-widget';

function App() {
  const config = {
    appId: "TU_SENDBIRD_APP_ID",
    userId: "TU_USER_ID",
    position: "bottom-right",
    showUnreadBadge: true,
  };

  return (
    <ChatWidgetProvider config={config}>
      <ChatWidget config={config} />
    </ChatWidgetProvider>
  );
}
```

### 2. Solo Icono de Chat

```tsx
import { ChatIcon } from '@your-company/chat-widget';

function Header() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <header className="flex items-center justify-between p-4">
      <h1>Mi Aplicación</h1>
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

### 3. Lista de Chats Personalizada

```tsx
import { ChatList } from '@your-company/chat-widget';

function ChatSidebar() {
  const config = {
    appId: "TU_SENDBIRD_APP_ID",
    userId: "TU_USER_ID",
  };

  const handleChannelSelect = (channel) => {
    console.log('Canal seleccionado:', channel);
    // Navegar al chat o abrir en nueva ventana
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

### 4. Ventana de Chat Independiente

```tsx
import { ChatWindow } from '@your-company/chat-widget';

function ChatPage() {
  const config = {
    appId: "TU_SENDBIRD_APP_ID",
    userId: "TU_USER_ID",
  };

  const [selectedChannel, setSelectedChannel] = useState(null);

  return (
    <div className="h-screen flex">
      {/* Sidebar con lista de canales */}
      <div className="w-80 border-r">
        <ChannelList
          config={config}
          onChannelSelect={(channel) => setSelectedChannel(channel)}
        />
      </div>

      {/* Área de chat */}
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

### 5. Widget con Estado Personalizado

```tsx
import { ChatWidgetProvider, useChatWidget, ChatIcon } from '@your-company/chat-widget';

function CustomChatWidget() {
  const config = {
    appId: "TU_SENDBIRD_APP_ID",
    userId: "TU_USER_ID",
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
                  Selecciona un canal para chatear
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

### 6. Múltiples Ventanas de Chat

```tsx
import { ChatWindow } from '@your-company/chat-widget';

function MultiChatInterface() {
  const config = {
    appId: "TU_SENDBIRD_APP_ID",
    userId: "TU_USER_ID",
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
      {/* Lista de canales */}
      <div className="w-80 border-r">
        <ChatList
          config={config}
          onChannelSelect={openChat}
        />
      </div>

      {/* Ventanas de chat múltiples */}
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

### 7. Hook de Mensajes No Leídos

```tsx
import { useUnreadMessages } from '@your-company/chat-widget';

function NotificationBadge() {
  const config = {
    appId: "TU_SENDBIRD_APP_ID",
    userId: "TU_USER_ID",
  };

  const unreadCount = useUnreadMessages(config);

  if (unreadCount === 0) return null;

  return (
    <div className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">
      {unreadCount} mensajes nuevos
    </div>
  );
}
```

### 8. Integración con React Router

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChatWidgetProvider, ChatWindow } from '@your-company/chat-widget';

function App() {
  const config = {
    appId: "TU_SENDBIRD_APP_ID",
    userId: "TU_USER_ID",
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

## 🎨 Personalización Avanzada

### Tema Personalizado

```tsx
const config = {
  appId: "TU_SENDBIRD_APP_ID",
  userId: "TU_USER_ID",
  theme: "dark",
  customTheme: {
    '--sendbird-light-primary-500': '#3B82F6',
    '--sendbird-light-primary-600': '#2563EB',
    '--sendbird-light-background-50': '#F8FAFC',
  },
};
```

### Posiciones Personalizadas

```tsx
// Widget en la esquina superior izquierda
<ChatWidget config={{ ...config, position: "top-left" }} />

// Widget en el centro de la pantalla
<div className="fixed inset-0 flex items-center justify-center z-50">
  <ChatWidget config={config} className="relative" />
</div>
```

### Estilos Personalizados

```tsx
<ChatIcon
  unreadCount={5}
  onClick={toggleChat}
  className="custom-chat-icon"
  size="xl"
/>

// CSS personalizado
.custom-chat-icon {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
}

.custom-chat-icon:hover {
  transform: scale(1.1);
}
```

## 🔧 Configuración Avanzada

### Callbacks de Eventos

```tsx
const config = {
  appId: "TU_SENDBIRD_APP_ID",
  userId: "TU_USER_ID",
  onMessageReceived: (message) => {
    // Mostrar notificación push
    showNotification('Nuevo mensaje', message.message);
  },
  onChannelChanged: (channel) => {
    // Actualizar URL o estado
    navigate(`/chat/${channel.url}`);
  },
  onUserConnected: (user) => {
    console.log('Usuario conectado:', user);
  },
  onUserDisconnected: (user) => {
    console.log('Usuario desconectado:', user);
  },
};
```

### Manejo de Errores

```tsx
function ChatWithErrorHandling() {
  const [error, setError] = useState(null);

  const config = {
    appId: "TU_SENDBIRD_APP_ID",
    userId: "TU_USER_ID",
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">Error de conexión: {error}</p>
        <button 
          onClick={() => setError(null)}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
        >
          Reintentar
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