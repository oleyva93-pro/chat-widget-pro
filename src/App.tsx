import { ChatWidget, ChatWidgetProvider } from "./index";

import "./index.css";

function App() {
  const config = {
    appId: "3CCEC8CF-D8FD-447B-88E2-91294429F5D2",
    userId: "oleyva930424@gmail.com",
    // userId: "alberto.moguel+superadmin@astech.com",
    // userId: "technician@lighthousetech.io",
    isOpen: true,
  };

  return (
    <div className="min-h-screen bg-zinc-800">
      <ChatWidgetProvider config={config}>
        <ChatWidget />
      </ChatWidgetProvider>
    </div>
  );
}

export default App;
