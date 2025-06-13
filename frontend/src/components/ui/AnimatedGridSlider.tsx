import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import AnimatedGrid from "./AnimatedGrid";

interface AnimatedGridSliderWrapperProps {
  images: string[];
  useAnimatedGrid?: boolean; // 初回にAnimatedGridを使用するかどうか
}

export default function AnimatedGridSliderWrapper({
  images,
  useAnimatedGrid = true, // デフォルトはtrue
}: AnimatedGridSliderWrapperProps) {
  const [index, setIndex] = useState(0);
  const [animatedGridShown, setAnimatedGridShown] = useState(useAnimatedGrid);
  const gridContainerRef = useRef<HTMLDivElement>(null);

  const getCurrentTargetSelector = () => {
    if (!useAnimatedGrid) return ".simple-img";
    return animatedGridShown ? ".animated-grid" : ".simple-img";
  };

  const handleNext = () => {
    const grid = gridContainerRef.current?.querySelector(getCurrentTargetSelector());
    if (!grid) return;

    gsap.set(grid, { scale: 1, opacity: 1 });
    gsap.to(grid, {
      opacity: 0,
      scale: 0.8,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        setIndex((prev) => (prev + 1) % images.length);
        if (animatedGridShown) setAnimatedGridShown(false);
      },
    });
  };

  const handlePrev = () => {
    const grid = gridContainerRef.current?.querySelector(getCurrentTargetSelector());
    if (!grid) return;

    gsap.set(grid, { scale: 1, opacity: 1 });
    gsap.to(grid, {
      opacity: 0,
      scale: 0.8,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        setIndex((prev) => (prev - 1 + images.length) % images.length);
        if (animatedGridShown) setAnimatedGridShown(false);
      },
    });
  };

  useEffect(() => {
    const grid = gridContainerRef.current?.querySelector(getCurrentTargetSelector());
    if (!grid) return;

    gsap.fromTo(
      grid,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }
    );
  }, [index, animatedGridShown]);

  return (
    <div className="animated-grid-container" ref={gridContainerRef}>
      <button className="nav-btn left" onClick={handlePrev}>{"<"}</button>

      <div className="grid-wrapper">
        {useAnimatedGrid && animatedGridShown ? (
          <AnimatedGrid imageUrl={images[0]} />
        ) : (
          <img
            src={images[index]}
            alt={`Slide ${index}`}
            className="simple-img"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "cover",
              display: "block",
              margin: "0 auto",
            }}
          />
        )}
      </div>

      <button className="nav-btn right" onClick={handleNext}>{">"}</button>
    </div>
  );
}
