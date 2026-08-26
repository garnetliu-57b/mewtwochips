import * as React from "react";

const MOBILE_BREAKPOINT = 768;

let mql: MediaQueryList | undefined;

function getMql() {
  mql ??= window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
  return mql;
}

function subscribe(callback: () => void) {
  const mql = getMql();
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return getMql().matches;
}

export function useIsMobile() {
  return React.useSyncExternalStore(subscribe, getSnapshot, () => false);
}
