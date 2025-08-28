import { useEffect, useLayoutEffect, useRef } from "react";
import usePreviousRef from '@/hooks/use-previous-ref';

export const useChatScroll = (active: boolean, callback: () => void) => {
  const callbackRef = useRef(callback);

  const ref = useRef<HTMLDivElement>(null);
  const previousHeight = usePreviousRef<number | undefined>(
    ref.current?.scrollHeight
  );

  if (typeof active !== "boolean") {
    console.warn(
      "useChatScroll: Active param (the first parameter) must be a boolean. Otherwise I can cause several re-renders."
    );
  }

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    if (ref.current && active) {
      ref.current.scrollTop = ref.current.scrollHeight;

      ref.current.addEventListener("scroll", () => {
        if (ref.current?.scrollTop === 0) {
          callbackRef.current?.();
        }
      });
    }
  }, [ref, active, callbackRef]);

  return { ref, previousHeight };
};
