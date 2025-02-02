import gsap from "gsap";
import { useEffect } from "react";

export function useAnimateCharacters(time, previousTime, refs) {
  useEffect(() => {
    refs.current.forEach((ref, index) => {
      if (ref && time[index] !== previousTime.current[index]) {
        gsap.fromTo(ref, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 0.5, ease: "back.in" });
      }
    });
  }, [time, previousTime, refs]);
}
