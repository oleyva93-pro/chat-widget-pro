import { useEffect, useLayoutEffect, useRef } from "react";

function useTabVisibility(callback: (visible: boolean) => void) {
  const handlerRef = useRef<((visible: boolean) => void) | null>(null);

  useLayoutEffect(() => {
    handlerRef.current = callback;
  });

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        handlerRef.current?.(true);
      } else {
        handlerRef.current?.(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
}

export default useTabVisibility;
