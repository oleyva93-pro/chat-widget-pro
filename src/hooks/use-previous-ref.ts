import { useEffect, useRef } from "react";

function useMountedRef() {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return mountedRef;
}

function usePreviousRef<T>(value: T) {
  const mountedRef = useMountedRef();
  const latestRef = useRef(value);
  const previousRef = useRef<T>();

  if (mountedRef.current) {
    previousRef.current = latestRef.current;
  }
  latestRef.current = value;

  return previousRef;
}

export default usePreviousRef;
