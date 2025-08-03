import "@sendbird/uikit-react/dist/index.css";
import React, { useCallback, useState } from "react";
import { Rnd } from "react-rnd";

import { useChatWidget } from "../../hooks/use-chat-widget";

const DEFAULT_SIZE = {
  width: 500,
  height: 500,
};

export function DragResize({ children }: { children: React.ReactNode }) {
  const { unReactiveOpenChats } = useChatWidget();

  const chatsOpens = unReactiveOpenChats.current.length;

  const [size, setSize] = useState({
    width: DEFAULT_SIZE.width,
    height: DEFAULT_SIZE.height,
  });

  const handleResize = useCallback(
    (
      _: unknown,
      __: unknown,
      {
        offsetWidth,
        offsetHeight,
      }: { offsetWidth: number; offsetHeight: number }
    ) => {
      setSize({
        width: offsetWidth,
        height: offsetHeight,
      });
    },
    []
  );

  return (
    <Rnd
      default={{
        x:
          window.innerWidth -
          DEFAULT_SIZE.width -
          320 * (chatsOpens == 1 ? chatsOpens : chatsOpens + 1),
        y: window.innerHeight - DEFAULT_SIZE.height - 20,
        width: DEFAULT_SIZE.width,
        height: DEFAULT_SIZE.height,
      }}
      minWidth={300}
      maxWidth={800}
      minHeight={300}
      maxHeight={800}
      enableResizing
      onResize={handleResize}
      bounds="window"
    >
      <div
        className="relative rounded-lg box"
        style={{ width: size.width, height: size.height }}
      >
        {children}
      </div>
    </Rnd>
  );
}
