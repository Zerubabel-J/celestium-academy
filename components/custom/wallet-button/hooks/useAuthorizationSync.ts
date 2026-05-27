import { MutableRefObject, useEffect, useRef, useState } from "react";

export function useAuthorizationSync(isAuthenticated: boolean): {
  authorized: boolean;
  setAuthorized: (value: boolean) => void;
  hasSessionRef: MutableRefObject<boolean>;
} {
  const [authorized, setAuthorized] = useState(isAuthenticated);
  const hasSessionRef = useRef(isAuthenticated);

  useEffect(() => {
    hasSessionRef.current = isAuthenticated;
    setAuthorized(isAuthenticated);
  }, [isAuthenticated]);

  return { authorized, setAuthorized, hasSessionRef };
}
