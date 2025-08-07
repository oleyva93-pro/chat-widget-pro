import React, { useCallback, useState } from "react";
import { Rnd } from "react-rnd";

import { DEFAULT_CHAT_SIZE, type ChatSize } from "../../types";

export function DragResize({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  const [size, setSize] = useState<ChatSize>({
    width: DEFAULT_CHAT_SIZE.width,
    height: DEFAULT_CHAT_SIZE.height,
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
          (DEFAULT_CHAT_SIZE.width + DEFAULT_CHAT_SIZE.gap) * (index + 1.9),
        y: window.innerHeight - DEFAULT_CHAT_SIZE.height,
        width: DEFAULT_CHAT_SIZE.width,
        height: DEFAULT_CHAT_SIZE.height,
      }}
      minWidth={DEFAULT_CHAT_SIZE.minWidth}
      maxWidth={DEFAULT_CHAT_SIZE.maxWidth}
      minHeight={DEFAULT_CHAT_SIZE.minHeight}
      maxHeight={DEFAULT_CHAT_SIZE.maxHeight}
      onResize={handleResize}
      bounds="window"
      dragHandleClassName="allow-drag"
      cancel=".cancel-drag"
    >
      <div
        className="relative rounded-lg"
        style={{ width: size.width, height: size.height }}
      >
        {children}
      </div>
    </Rnd>
  );
}
