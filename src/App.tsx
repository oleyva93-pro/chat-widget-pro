// import { ChatWidget, ChatWidgetProvider } from "chat-widget-sendbird";
import { ChatWidget, ChatWidgetProvider } from "./index";

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
    <div className="min-h-screen bg-zinc-800">
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
