import { useEffect, useRef, useState } from "react";

export function useTimeUpdate(interval) {
  const [time, setTime] = useState("");
  const previousTime = useRef("");

  useEffect(() => {
    const timerId = setInterval(() => {
      previousTime.current = time;
      setTime(new Date().toLocaleTimeString());
    }, interval);
    return () => clearInterval(timerId);
  }, [time, interval]);

  return [time, previousTime];
}
