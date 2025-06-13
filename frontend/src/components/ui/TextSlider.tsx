// components/ui/TextSlider.tsx
import { useEffect, useRef } from "react";

interface TextSliderProps {
  text: string;
  speed?: number;
  direction?: "left" | "right";
  fontSize?: string;
  color?: string;
}

export default function TextSlider({
  text,
  speed = 0.5, // スクロール速度
  direction = "left", // スクロール方向
  fontSize = "2rem", // フォントサイズ
  color = "#ffffff", // テキスト色
}: TextSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);

  useEffect(() => {
    let animationFrameId: number;

    const step = () => {
      const container = containerRef.current;
      if (!container) return;

      const maxScroll = container.scrollWidth / 2;

      posRef.current += direction === "right" ? -speed : speed;

      if (direction === "right" && posRef.current <= 0) {
        posRef.current = maxScroll;
      }
      if (direction === "left" && posRef.current >= maxScroll) {
        posRef.current = 0;
      }
      container.scrollLeft = posRef.current;

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    // 30秒後に自動停止
    setTimeout(() => {
      cancelAnimationFrame(animationFrameId);
    }, 30000);

    return () => cancelAnimationFrame(animationFrameId);
  }, [direction]);

  return (
    <div
      ref={containerRef}
      style={{
        overflowX: "hidden",
        whiteSpace: "nowrap",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "inline-block",
          whiteSpace: "nowrap",
          fontSize,
          paddingRight: "2rem",
          color: color,
        }}
      >
        {text}
      </div>
      <div
        style={{
          display: "inline-block",
          whiteSpace: "nowrap",
          fontSize,
        }}
      >
        {text}
      </div>
    </div>
  );
}
