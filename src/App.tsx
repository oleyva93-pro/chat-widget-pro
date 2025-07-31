import { ChatWidget, ChatWidgetProvider } from "chat-widget-sendbird";
import { useState } from "react";
import "./index.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const config = {
    appId: "3CCEC8CF-D8FD-447B-88E2-91294429F5D2",
    userId: "oleyva930424@gmail.com",
    position: "bottom-right" as const,
    showUnreadBadge: true,
    isOpen,
  };

  const handleChannelChanged = (channel: unknown) => {
    console.log("Channel changed:", channel);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Demo Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Chat Widget Demo
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Widget de chat modular con SendBird
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                {isOpen ? "Cerrar Widget" : "Abrir Widget"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Características del Widget
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">
                🎯 Componentes Modulares
              </h3>
              <p className="text-sm text-gray-600">
                Usa componentes individuales: ChatIcon, ChatList, ChannelList,
                ChatWindow
              </p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">
                🔗 SendBird Real
              </h3>
              <p className="text-sm text-gray-600">
                Conectado con tu SendBird real usando tus credenciales
              </p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">
                📦 NPM Package
              </h3>
              <p className="text-sm text-gray-600">
                Listo para publicar como paquete npm reutilizable
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Widget */}
      <ChatWidgetProvider
        config={config}
        isOpen={isOpen}
        onChannelChanged={handleChannelChanged}
      >
        <ChatWidget config={config} />
      </ChatWidgetProvider>
    </div>
  );
}

export default App;
