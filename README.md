# Chat Widget SendBird

Un widget de chat profesional construido con SendBird UI Kit y React, listo para usar en cualquier aplicación web.

## 🚀 Características

- ✅ **Chat en tiempo real** con SendBird
- ✅ **Interfaz moderna** y responsive
- ✅ **Múltiples ventanas de chat** simultáneas
- ✅ **Badge de mensajes no leídos**
- ✅ **Posicionamiento flexible** (bottom-right, bottom-left, top-right, top-left)
- ✅ **TypeScript** incluido
- ✅ **Estilos incluidos** automáticamente
- ✅ **Fácil integración** en cualquier proyecto React

## 📦 Instalación

```bash
npm install chat-widget-sendbird
```

## 🎯 Uso Básico

```tsx
import React from 'react';
import { ChatWidget } from 'chat-widget-sendbird';

function App() {
  const config = {
    appId: "TU_SENDBIRD_APP_ID",
    userId: "usuario-unico-123",
    position: "bottom-right", // bottom-right, bottom-left, top-right, top-left
    showUnreadBadge: true,
    isOpen: false
  };

  return <ChatWidget config={config} />;
}
```

## ⚙️ Configuración

### Configuración Básica

```tsx
const config = {
  appId: "TU_SENDBIRD_APP_ID",        // Requerido
  userId: "usuario-unico-123",        // Requerido
  accessToken: "token-opcional",      // Opcional
  position: "bottom-right",           // Opcional: bottom-right, bottom-left, top-right, top-left
  showUnreadBadge: true,              // Opcional: true/false
  isOpen: false,                      // Opcional: true/false
  theme: "light",                     // Opcional: light/dark
  language: "es"                      // Opcional: es, en, etc.
};
```

### Configuración Avanzada

```tsx
const config = {
  appId: "TU_SENDBIRD_APP_ID",
  userId: "usuario-unico-123",
  accessToken: "token-opcional",
  position: "bottom-right",
  showUnreadBadge: true,
  isOpen: false,
  theme: "light",
  language: "es",
  customTheme: {
    // Personalización de colores
    "--sendbird-light-primary-300": "#742ddd",
    "--sendbird-light-background-50": "#ffffff"
  },
  onChannelChanged: (channel) => {
    console.log('Canal cambiado:', channel);
  },
  onMessageReceived: (message) => {
    console.log('Mensaje recibido:', message);
  },
  onUserConnected: (user) => {
    console.log('Usuario conectado:', user);
  },
  onUserDisconnected: (user) => {
    console.log('Usuario desconectado:', user);
  }
};
```

## 🧩 Componentes Individuales

### ChatIcon

```tsx
import { ChatIcon } from 'chat-widget-sendbird';

<ChatIcon
  unreadCount={5}
  onClick={() => console.log('Icono clickeado')}
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
  onChannelSelect={(channel) => console.log('Canal seleccionado:', channel)}
  className="custom-class"
/>
```

### ChannelList

```tsx
import { ChannelList } from 'chat-widget-sendbird';

<ChannelList
  config={config}
  onChannelSelect={(channel) => console.log('Canal seleccionado:', channel)}
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

## 🎨 Personalización

### Estilos CSS

Los estilos se incluyen automáticamente, pero puedes personalizarlos:

```css
/* Personalizar el widget */
.chat-widget-container {
  font-family: 'Tu Fuente', sans-serif;
}

/* Personalizar el icono */
.chat-icon {
  background-color: #tu-color !important;
}

/* Personalizar el badge */
.unread-badge {
  background-color: #ff0000 !important;
}
```

### Temas

```tsx
// Tema claro (por defecto)
const lightConfig = {
  ...config,
  theme: "light"
};

// Tema oscuro
const darkConfig = {
  ...config,
  theme: "dark"
};
```

## 🔧 Solución de Problemas

### Error: "Instance ID is missing"

**Causa:** SendBird no se inicializa correctamente.

**Solución:**
1. Verifica que tu `appId` sea válido
2. Asegúrate de que el `userId` sea único
3. Revisa la consola del navegador para más detalles

### Error: "SendBird SDK not found"

**Causa:** El SDK de SendBird no se carga.

**Solución:**
1. Verifica tu conexión a internet
2. Asegúrate de usar la versión más reciente del paquete
3. Limpia la caché del navegador

### Los estilos no se cargan

**Causa:** Los estilos de SendBird no se importan.

**Solución:**
1. Los estilos se incluyen automáticamente
2. Si usas CSS modules, asegúrate de importar los estilos manualmente:

```tsx
import 'chat-widget-sendbird/dist/style.css';
```

## 📋 Requisitos

- React 18+ o 19+
- SendBird App ID válido
- Conexión a internet

## 🚀 Ejemplo Completo

```tsx
import React, { useState } from 'react';
import { ChatWidget, ChatWidgetProvider } from 'chat-widget-sendbird';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const config = {
    appId: "2D7B4CDB-932F-4AE2-8FE9-3BBEC7353A4A",
    userId: "usuario-" + Date.now(),
    position: "bottom-right",
    showUnreadBadge: true,
    isOpen: isOpen,
    onChannelChanged: (channel) => {
      console.log('Canal cambiado:', channel);
    },
    onMessageReceived: (message) => {
      console.log('Mensaje recibido:', message);
    }
  };

  return (
    <div>
      <h1>Mi Aplicación con Chat</h1>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Cerrar Chat' : 'Abrir Chat'}
      </button>
      
      <ChatWidgetProvider config={config}>
        <ChatWidget config={config} />
      </ChatWidgetProvider>
    </div>
  );
}

export default App;
```

## 📄 Licencia

MIT

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Si tienes problemas o preguntas:

1. Revisa la [documentación de SendBird](https://sendbird.com/docs)
2. Abre un issue en GitHub
3. Contacta al autor: oleyva93-pro

---

**¡Disfruta usando el Chat Widget SendBird! 🎉**
