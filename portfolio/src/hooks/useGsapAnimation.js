import gsap from 'gsap';
import { useLayoutEffect } from "react";

export default function useGsapAnimation(selector, args, triggerElement) {
    useLayoutEffect(() => {
        gsap.from(selector, {
            ...args,
            scrollTrigger: {
                trigger: triggerElement,
                start: 'top 80%',
                toggleActions: 'play none none none',
            }
        })
    }, []);
}