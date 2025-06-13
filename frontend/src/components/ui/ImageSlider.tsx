import { useEffect, useRef } from "react";

interface ImageSliderProps {
  images: string[];
  size?: number;
  shape?: "circle" | "square";
  direction?: "left" | "right";
  speed?: number;
}

export default function ImageSlider({
  images,
  size = 700, // 画像のサイズ
  shape = "circle", // 画像の形状
  direction = "left", // スクロール方向
  speed = 0.5, // スクロール速度
}: ImageSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);

  useEffect(() => {
    let animationFrameId: number;

    const step = () => {
      const container = containerRef.current;
      if (!container) return;

      const maxScroll = container.scrollWidth / 2;

      // スクロール方向に応じて調整
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
