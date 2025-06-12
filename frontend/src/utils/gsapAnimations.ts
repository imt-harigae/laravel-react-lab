// utils/gsapAnimations.ts
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type AnimationType = "fade" | "slide-up" | "zoom-in" | "slide-down" | "slide-left" | "slide-right";

interface AnimateOnScrollOptions {
  trigger?: HTMLElement;
  animationType?: AnimationType;
  once?: boolean;
  delay?: number;
  duration?: number;
}

export const animateOnScroll = (
  target: HTMLElement,
  {
    trigger = target,
    animationType = "fade",
    delay = 0,
    duration = 1.2,
    once = true,
  }: AnimateOnScrollOptions = {}
) => {
  let fromVars: gsap.TweenVars = { opacity: 0 };
  let toVars: gsap.TweenVars = {
    opacity: 1,
    delay,
    duration,
    ease: "power2.out",
    scrollTrigger: {
      trigger,
      start: "top 100%",
      toggleActions: "play none none reverse",
      once,
    },
  };

  // アニメーションタイプ別に調整
  switch (animationType) {
    case "fade":
      break;

    case "slide-up":
      fromVars.y = 50;
      toVars.y = 0;
      break;

    case "slide-down":
      fromVars.y = -50;
      toVars.y = 0;
      break;

    case "slide-left":
      fromVars.x = -50;
      toVars.x = 0;
      break;

    case "slide-right":
      fromVars.x = 50;
      toVars.x = 0;
      break;

    case "zoom-in":
      fromVars.scale = 1.2;
      toVars.scale = 1;
      break;
  }

  gsap.fromTo(target, fromVars, toVars);
};
