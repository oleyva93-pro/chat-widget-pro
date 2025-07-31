import React from "react";
import { ChatWidgetProvider, ChatWidget } from "../src/index";

function ExampleApp() {
  const config = {
    appId: "3CCEC8CF-D8FD-447B-88E2-91294429F5D2", // Replace with your actual SendBird App ID
    userId: "oleyva930424@gmail.com",
    theme: "light" as const,
    position: "bottom-right" as const,
    showUnreadBadge: true,
    language: "en",
    onMessageReceived: (message: any) => {
      console.log("New message received:", message);
    },
    onChannelChanged: (channel: any) => {
      console.log("Channel changed:", channel);
    },
    onUserConnected: (user: any) => {
      console.log("User connected:", user);
    },
    onUserDisconnected: (user: any) => {
      console.log("User disconnected:", user);
    },
  };

  return (
    <ChatWidgetProvider {...config}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Chat Widget Demo
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  This is a demonstration of the chat widget integration
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Features
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Floating chat icon with unread message badge</li>
                    <li>• Expandable chat window</li>
                    <li>• Channel list and chat list tabs</li>
                    <li>
                      • Real-time messaging (when integrated with SendBird)
                    </li>
                    <li>• Responsive design</li>
                    <li>• Customizable themes and positions</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Configuration
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>
                      <strong>App ID:</strong> {config.appId}
                    </p>
                    <p>
                      <strong>User ID:</strong> {config.userId}
                    </p>
                    <p>
                      <strong>Theme:</strong> {config.theme}
                    </p>
                    <p>
                      <strong>Position:</strong> {config.position}
                    </p>
                    <p>
                      <strong>Language:</strong> {config.language}
                    </p>
                    <p>
                      <strong>Show Badge:</strong>{" "}
                      {config.showUnreadBadge ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Setup Instructions
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                  <li>
                    Replace 'YOUR_SENDBIRD_APP_ID' with your actual SendBird App
                    ID
                  </li>
                  <li>Configure your SendBird application settings</li>
                  <li>Customize the widget appearance and behavior</li>
                  <li>Deploy to your production environment</li>
                </ol>
              </div>
            </div>
          </div>
        </main>

        {/* Chat Widget */}
        <ChatWidget config={config} />
      </div>
    </ChatWidgetProvider>
  );
}

export default ExampleApp;
