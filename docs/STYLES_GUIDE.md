# Guía de Estilos - SendBird UI Kit

## 🎨 Estilos Incluidos Automáticamente

El paquete `chat-widget-sendbird` incluye automáticamente todos los estilos necesarios de SendBird UI Kit. **No necesitas importar nada adicional**.

## ✅ Uso Correcto

```tsx
// ✅ CORRECTO - Los estilos se importan automáticamente
import { ChatWidget, ChatWidgetProvider } from 'chat-widget-sendbird';

function App() {
  const config = {
    appId: "TU_SENDBIRD_APP_ID",
    userId: "TU_USER_ID",
  };

  return (
    <ChatWidgetProvider config={config}>
      <ChatWidget config={config} />
    </ChatWidgetProvider>
  );
}
```

## ❌ Uso Incorrecto

```tsx
// ❌ INCORRECTO - No es necesario importar los estilos manualmente
import '@sendbird/uikit-react/dist/index.css'; // ❌ No hacer esto
import { ChatWidget } from 'chat-widget-sendbird';
```

## 🔧 Cómo Funciona

### 1. Estilos Incluidos en el Paquete

Los estilos de SendBird UI Kit se procesan y empaquetan junto con el código JavaScript:

```css
/* Esto se incluye automáticamente en el paquete */
@import "@sendbird/uikit-react/dist/index.css";

/* Estilos adicionales del widget */
.chat-widget-container {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### 2. Importación Automática

Cuando importas cualquier componente del paquete, los estilos se cargan automáticamente:

```tsx
// Solo necesitas esto
import { ChatWidget } from 'chat-widget-sendbird';

// Los estilos se cargan automáticamente en el background
```

## 🎨 Personalización de Estilos

### Variables CSS de SendBird

Puedes personalizar los colores y estilos sobrescribiendo las variables CSS de SendBird:

```css
/* En tu archivo CSS global */
:root {
  /* Colores principales */
  --sendbird-light-primary-500: #3B82F6;
  --sendbird-light-primary-600: #2563EB;
  --sendbird-light-primary-700: #1D4ED8;
  
  /* Colores de fondo */
  --sendbird-light-background-50: #F8FAFC;
  --sendbird-light-background-100: #F1F5F9;
  --sendbird-light-background-200: #E2E8F0;
  
  /* Colores de texto */
  --sendbird-light-onlight-01: #1E293B;
  --sendbird-light-onlight-02: #475569;
  --sendbird-light-onlight-03: #64748B;
  
  /* Colores de borde */
  --sendbird-light-ondark-01: #FFFFFF;
  --sendbird-light-ondark-02: #F1F5F9;
  --sendbird-light-ondark-03: #E2E8F0;
}
```

### Tema Oscuro

Para usar el tema oscuro, configura el tema en el componente:

```tsx
const config = {
  appId: "TU_SENDBIRD_APP_ID",
  userId: "TU_USER_ID",
  theme: "dark", // Cambiar a tema oscuro
};

<ChatWidget config={config} />
```

### Estilos Personalizados

Puedes agregar estilos personalizados usando la prop `className`:

```tsx
<ChatWidget 
  config={config} 
  className="custom-chat-widget"
/>

// En tu CSS
.custom-chat-widget {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
}
```

## 🔍 Solución de Problemas

### Los estilos no se cargan

1. **Verifica que estés usando la versión correcta del paquete**
2. **No importes manualmente los estilos de SendBird**
3. **Asegúrate de que el paquete esté instalado correctamente**

```bash
# Reinstalar el paquete
npm uninstall chat-widget-sendbird
npm install chat-widget-sendbird
```

### Los estilos se ven diferentes

1. **Verifica que no haya conflictos con otros estilos**
2. **Usa las variables CSS para personalizar**
3. **Asegúrate de que Tailwind CSS esté configurado correctamente**

### Problemas de rendimiento

1. **Los estilos se cargan una sola vez**
2. **El paquete está optimizado para producción**
3. **Los estilos se tree-shake automáticamente**

## 📦 Estructura del Paquete

```
chat-widget-sendbird/
├── dist/
│   ├── index.js          # CommonJS bundle
│   ├── index.esm.js      # ES Module bundle
│   ├── index.umd.js      # UMD bundle
│   ├── style.css         # Estilos procesados
│   └── index.d.ts        # TypeScript definitions
└── package.json
```

## 🚀 Mejores Prácticas

### 1. Importación Única

```tsx
// ✅ Correcto
import { ChatWidget, ChatWidgetProvider } from 'chat-widget-sendbird';

// ❌ Incorrecto - Importaciones múltiples
import { ChatWidget } from 'chat-widget-sendbird';
import { ChatWidgetProvider } from 'chat-widget-sendbird';
```

### 2. Configuración Centralizada

```tsx
// ✅ Correcto - Configuración reutilizable
const sendBirdConfig = {
  appId: "TU_SENDBIRD_APP_ID",
  userId: "TU_USER_ID",
  theme: "light",
};

<ChatWidgetProvider config={sendBirdConfig}>
  <ChatWidget config={sendBirdConfig} />
</ChatWidgetProvider>
```

### 3. Personalización de Estilos

```tsx
// ✅ Correcto - Usar className para estilos personalizados
<ChatWidget 
  config={config} 
  className="my-custom-chat-widget"
/>

// ❌ Incorrecto - No sobrescribir estilos directamente
<ChatWidget 
  config={config} 
  style={{ /* no hacer esto */ }}
/>
```

## 🔧 Desarrollo Local

Si estás desarrollando localmente y quieres ver los estilos:

1. **Clona el repositorio**
2. **Instala las dependencias**
3. **Ejecuta el servidor de desarrollo**

```bash
git clone https://github.com/oleyva93-pro/chat-widget-pro
cd chat-widget-pro
npm install
npm run dev
```

Los estilos se cargarán automáticamente en el servidor de desarrollo.

## 📚 Recursos Adicionales

- [Documentación de SendBird UI Kit](https://sendbird.com/docs/uikit/v3/react/overview)
- [Guía de Personalización de SendBird](https://sendbird.com/docs/uikit/v3/react/guides/theming)
- [Variables CSS de SendBird](https://sendbird.com/docs/uikit/v3/react/guides/theming#css-variables) 