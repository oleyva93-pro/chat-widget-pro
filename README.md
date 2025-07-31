# @your-company/chat-widget

Un widget de chat profesional y modular construido con React, Vite, Tailwind CSS y SendBird UI Kit.

## 🚀 Características

- **Componentes Modulares**: Usa componentes individuales según tus necesidades
- **SendBird Real**: Conectado con la API real de SendBird
- **Chat en Tiempo Real**: Mensajería instantánea con múltiples canales
- **Diseño Responsive**: Interfaz moderna con Tailwind CSS
- **NPM Package**: Listo para publicar y reutilizar
- **TypeScript**: Tipado completo para mejor desarrollo

## 📦 Instalación

```bash
npm install @your-company/chat-widget
```

## 🎯 Uso Rápido

### Widget Completo

```tsx
import { ChatWidgetProvider, ChatWidget } from '@your-company/chat-widget';

const config = {
  appId: "TU_SENDBIRD_APP_ID",
  userId: "TU_USER_ID",
  position: "bottom-right",
  showUnreadBadge: true,
};

function App() {
  return (
    <ChatWidgetProvider config={config}>
      <ChatWidget config={config} />
    </ChatWidgetProvider>
  );
}
```

### Componentes Individuales

#### ChatIcon (Icono con Badge)

```tsx
import { ChatIcon } from '@your-company/chat-widget';

<ChatIcon
  unreadCount={5}
  onClick={() => console.log('Chat clicked')}
  showBadge={true}
  size="lg"
/>
```

#### ChatList (Lista de Chats)

```tsx
import { ChatList } from '@your-company/chat-widget';

<ChatList
  config={config}
  onChannelSelect={(channel) => console.log('Channel selected:', channel)}
/>
```

#### ChannelList (Lista de Canales)

```tsx
import { ChannelList } from '@your-company/chat-widget';

<ChannelList
  config={config}
  onChannelSelect={(channel) => console.log('Channel selected:', channel)}
/>
```

#### ChatWindow (Ventana de Chat)

```tsx
import { ChatWindow } from '@your-company/chat-widget';

<ChatWindow
  config={config}
  channelUrl="CHANNEL_URL"
/>
```

## ⚙️ Configuración

### SendBirdConfig

```tsx
interface SendBirdConfig {
  appId: string;           // Tu SendBird App ID
  userId: string;          // ID del usuario
  accessToken?: string;    // Token de acceso (opcional)
  theme?: "light" | "dark"; // Tema
  customTheme?: Record<string, any>; // Tema personalizado
  language?: string;       // Idioma
}
```

### ChatWidgetConfig

```tsx
interface ChatWidgetConfig extends SendBirdConfig {
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  showUnreadBadge?: boolean;
  isOpen?: boolean;
  onChannelChanged?: (channel: any) => void;
  onMessageReceived?: (message: any) => void;
  onUserConnected?: (user: any) => void;
  onUserDisconnected?: (user: any) => void;
}
```

## 🎨 Personalización

### Posiciones del Widget

```tsx
const positions = [
  "bottom-right",  // Esquina inferior derecha (por defecto)
  "bottom-left",   // Esquina inferior izquierda
  "top-right",     // Esquina superior derecha
  "top-left"       // Esquina superior izquierda
];
```

### Tamaños del Icono

```tsx
const sizes = [
  "sm",   // 32x32px
  "md",   // 40x40px
  "lg",   // 48x48px (por defecto)
  "xl"    // 64x64px
];
```

## 🔧 Desarrollo

### Instalar Dependencias

```bash
npm install
```

### Servidor de Desarrollo

```bash
npm run dev
```

### Construir Biblioteca

```bash
npm run build:lib
```

### Linting

```bash
npm run lint
```

## 📚 API Reference

### ChatWidget

Widget completo con icono flotante y ventana expandible.

**Props:**
- `config: ChatWidgetConfig` - Configuración del widget
- `className?: string` - Clases CSS adicionales

### ChatIcon

Icono de chat con badge de mensajes no leídos.

**Props:**
- `unreadCount?: number` - Número de mensajes no leídos
- `onClick?: () => void` - Función al hacer clic
- `showBadge?: boolean` - Mostrar badge (por defecto: true)
- `size?: "sm" | "md" | "lg" | "xl"` - Tamaño del icono
- `className?: string` - Clases CSS adicionales

### ChatList

Lista de chats usando SendBird GroupChannelList.

**Props:**
- `config: SendBirdConfig` - Configuración de SendBird
- `onChannelSelect?: (channel: any) => void` - Callback al seleccionar canal
- `className?: string` - Clases CSS adicionales

### ChannelList

Lista de canales usando SendBird GroupChannelList.

**Props:**
- `config: SendBirdConfig` - Configuración de SendBird
- `onChannelSelect?: (channel: any) => void` - Callback al seleccionar canal
- `className?: string` - Clases CSS adicionales

### ChatWindow

Ventana de chat para un canal específico.

**Props:**
- `config: SendBirdConfig` - Configuración de SendBird
- `channelUrl?: string` - URL del canal a mostrar
- `className?: string` - Clases CSS adicionales

### ChatWidgetProvider

Provider para el estado del widget.

**Props:**
- `children: React.ReactNode` - Componentes hijos
- `config: SendBirdConfig` - Configuración de SendBird
- `isOpen?: boolean` - Estado inicial abierto/cerrado
- `onChannelChanged?: (channel: any) => void` - Callback al cambiar canal

### useChatWidget

Hook para acceder al estado del widget.

**Returns:**
- `state: ChatWidgetState` - Estado actual
- `toggleChat: () => void` - Función para abrir/cerrar
- `selectChannel: (channel: any) => void` - Función para seleccionar canal
- `updateUnreadCount: (count: number) => void` - Función para actualizar contador
- `setConnected: (connected: boolean) => void` - Función para establecer conexión

### useUnreadMessages

Hook para manejar mensajes no leídos.

**Params:**
- `config: { appId: string; userId: string }` - Configuración básica

**Returns:**
- `unreadCount: number` - Número de mensajes no leídos

## 🚀 Publicación

### Preparar para Publicación

```bash
npm run build:lib
```

### Publicar en NPM

```bash
npm publish
```

O usar el script automatizado:

```bash
./scripts/publish.sh
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisa la [documentación de SendBird](https://sendbird.com/docs)
2. Abre un issue en este repositorio
3. Contacta al equipo de desarrollo

## 📝 Changelog

### v1.0.0
- ✅ Widget completo con SendBird real
- ✅ Componentes modulares individuales
- ✅ Chat en tiempo real
- ✅ Badge de mensajes no leídos
- ✅ Diseño responsive con Tailwind
- ✅ TypeScript completo
- ✅ NPM package listo
