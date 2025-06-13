import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import "../../css/fadeIn.css";

interface FadeInProps {
  children: React.ReactNode;
}

export default function FadeIn({ children }: FadeInProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!wrapperRef.current || !contentRef.current) return;

    // 初期設定（非表示）
    gsap.set(contentRef.current, {
      opacity: 0,
      scale: 0.8,
    });

    const wrapper = wrapperRef.current;
    const enter = () => {
      gsap.to(contentRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "expo.out",
      });
    };
    const leave = () => {
      gsap.to(contentRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: "expo.inOut",
      });
    };

    wrapper.addEventListener("mouseenter", enter);
    wrapper.addEventListener("mouseleave", leave);

    return () => {
      wrapper.removeEventListener("mouseenter", enter);
      wrapper.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div ref={wrapperRef}>
      <div ref={contentRef} className="fadein-content">
        {children}
      </div>
    </div>
  );
}
