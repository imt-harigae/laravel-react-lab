// components/animation/FadeInOnScroll.tsx
import { useRef, useLayoutEffect } from "react";
import { animateOnScroll } from "../../utils/gsapAnimations";

type AnimationType = "fade" | "slide-up" | "zoom-in" | "slide-down" | "slide-left" | "slide-right";

interface Props {
  children: React.ReactNode;
  animationType?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
}

export default function FadeInOnScroll({
  children,
  animationType = "fade",
  delay = 0,
  duration = 1.2,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (ref.current) {
      animateOnScroll(ref.current, { animationType, delay, duration });
    }
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
