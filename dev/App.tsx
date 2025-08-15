import { ChatList, ChatWidget, ChatWidgetProvider } from "../src/index";

function App() {
  const config = {
    appId: "3CCEC8CF-D8FD-447B-88E2-91294429F5D2",
    // userId: "oleyva930424@gmail.com",
    userId: "alberto.moguel+superadmin@astech.com",
    // userId: "technician@lighthousetech.io",

    // another app
    // appId: "362E637D-9F70-414C-A5C3-EA689A880FCC",
    // userId: "oleyva930424",
    isOpen: true,
  };

  return (
    <div className="min-h-screen bg-zinc-100">
      <ChatWidgetProvider config={config}>
        <div className="flex flex-row h-screen">
          <div className="fixed right-0 top-0 h-screen">
            <ChatList />
          </div>
          <ChatWidget />
        </div>
      </ChatWidgetProvider>
    </div>
  );
}

export default App;
