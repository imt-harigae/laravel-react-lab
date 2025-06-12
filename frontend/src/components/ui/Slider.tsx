import { useEffect, useRef } from "react";

interface Props {
  images: string[];
  size?: number; // default: 700
  shape?: "circle" | "square"; // default: circle
  direction?: "left" | "right"; // default: left
  speed?: number; // default: 0.5
}

export default function Slider({
  images,
  size = 700,
  shape = "circle",
  direction = "left",
  speed = 0.5,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);

  useEffect(() => {
    let animationFrameId: number;

    const step = () => {
      const container = containerRef.current;
      if (!container) return;

      const maxScroll = container.scrollWidth / 2;

      // スクロール方向に応じて調整
      posRef.current += direction === "left" ? -speed : speed;

      if (direction === "left" && posRef.current <= 0) {
        posRef.current = maxScroll;
      }
      if (direction === "right" && posRef.current >= maxScroll) {
        posRef.current = 0;
      }

      container.scrollLeft = posRef.current;

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [direction]);

  const imageClass = `
    inline-block
    ${shape === "circle" ? "rounded-full" : "rounded-none"}
    object-cover
    mr-5
  `;

  return (
    <div
      ref={containerRef}
      className="overflow-x-hidden w-full whitespace-nowrap"
    >
      {/* 無限スクロール対応のために画像を2回レンダリング */}
      {[...images, ...images].map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          width={size}
          height={size}
          className={imageClass}
          style={{ width: size, height: size }}
        />
      ))}
    </div>
  );
}
