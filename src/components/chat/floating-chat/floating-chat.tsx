import { X } from "lucide-react";
import { memo, useState } from "react";

import { useChatWidget } from "../../../hooks/use-chat-widget";
import { FloatingContent } from "./floating-content";

function FloatingChat({ channelUrl }: { channelUrl: string }) {
  const { handleMinimizeChat, handleCloseChat } = useChatWidget();

  function handleToggle() {
    handleMinimizeChat(channelUrl);
  }

  return (
    <section className="animate-fade-in">
      <WrapperButton
        channelUrl={channelUrl}
        handleToggle={handleToggle}
        handleCloseChat={handleCloseChat}
      >
        <FloatingContent channelUrl={channelUrl} />
      </WrapperButton>
    </section>
  );
}

function WrapperButton({
  children,
  channelUrl,
  handleToggle,
  handleCloseChat,
}: {
  children: React.ReactNode;
  channelUrl: string;
  handleToggle: () => void;
  handleCloseChat: (channelUrl: string) => void;
}) {
  const [showCloseButton, setShowCloseButton] = useState(false);

  return (
    <div
      data-tooltip-id={channelUrl}
      className="bg-gray-200 shadow-chw relative cursor-pointer rounded-full justify-center items-center flex p-0.5 transition delay-50 duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-100 "
      onClick={handleToggle}
      onMouseEnter={() => setShowCloseButton(true)}
      onMouseLeave={() => setShowCloseButton(false)}
    >
      {showCloseButton ? (
        <div
          className="absolute shadow-chw bg-white top-0 right-0 cursor-pointer rounded-full justify-center items-center flex p-1 transition delay-50 duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-100 "
          onClick={() => handleCloseChat(channelUrl)}
        >
          <X className="h-3 w-3" color="black" />
        </div>
      ) : null}
      {children}
    </div>
  );
}

export default memo(FloatingChat);
