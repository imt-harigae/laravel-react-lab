import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "../../css/gsap.css";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedImageGridProps {
  imageUrl: string;
}

interface GridConfig {
  cols: number;
  rows: number;
  cellSize: number;
}

export default function AnimatedImageGrid({ imageUrl }: AnimatedImageGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [gridConfig, setGridConfig] = useState<GridConfig>({ cols: 10, rows: 10, cellSize: 50 });

  // グリッド構成の計算と更新
  const calculateGridConfig = (img: HTMLImageElement, container: HTMLElement): GridConfig => {
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const imgRatio = img.width / img.height;
    const containerRatio = containerWidth / containerHeight;

    let gridWidth: number, gridHeight: number;

    if (imgRatio > containerRatio) {
      gridWidth = containerWidth;
      gridHeight = gridWidth / imgRatio;
    } else {
      gridHeight = containerHeight;
      gridWidth = gridHeight * imgRatio;
    }

    const targetCols = 20; // ターゲットの列数 下げるほどマスが大きく
    const cellSize = Math.floor(gridWidth / targetCols);
    const cols = Math.floor(gridWidth / cellSize);
    const rows = Math.floor(gridHeight / cellSize);

    return { cols, rows, cellSize };
  };

  // グリッドセルのDOM構築
  const createGridElements = (
    cols: number,
    rows: number,
    cellSize: number,
    imageUrl: string
  ): HTMLDivElement[] => {
    const total = cols * rows;
    const rects: HTMLDivElement[] = [];
    const el = gridRef.current;
    if (!el) return [];

    el.innerHTML = "";

    for (let i = 0; i < total; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const rect = document.createElement("div");
      const front = document.createElement("div");
      const back = document.createElement("div");

      rect.className = "flip-rect";
      front.className = "face front";
      back.className = "face back";

      back.style.backgroundImage = `url(${imageUrl})`;
      back.style.backgroundSize = `${cols * cellSize}px ${rows * cellSize}px`;
      back.style.backgroundPosition = `-${col * cellSize}px -${row * cellSize}px`;

      rect.style.width = `${cellSize}px`;
      rect.style.height = `${cellSize}px`;

      rect.appendChild(front);
      rect.appendChild(back);
      el.appendChild(rect);
      rects.push(rect);
    }

    return rects;
  };

  // GSAP アニメーションの定義
  const animateGrid = (rects: HTMLDivElement[], rows: number, cols: number) => {
    const el = gridRef.current;
    if (!el) return;

    gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        once: true,
      },
    })
      .from(rects, {
        scale: 0,
        duration: 1,
        ease: "power4.out",
        autoAlpha: 0,
        stagger: {
          each: 0.05,
          from: "center",
          grid: [rows, cols],
        },
      })
      .fromTo(
        rects,
        {
          opacity: 0,
          filter: "grayscale(100%) blur(0px)",
        },
        {
          delay: 0.2,
          duration: 1.2,
          scale: 1,
          opacity: 1,
          filter: "grayscale(0%) blur(0px)",
          stagger: {
            each: 0.05,
            from: "center",
            grid: [rows, cols],
          },
        }
      );
  };

  useEffect(() => {
    const el = gridRef.current;
    if (!el || !el.parentElement) return;

    const container = el.parentElement;
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      const config = calculateGridConfig(img, container);
      setGridConfig(config);

      const rects = createGridElements(config.cols, config.rows, config.cellSize, imageUrl);
      animateGrid(rects, config.rows, config.cols);
    };
  }, [imageUrl]);

  const { cols, rows, cellSize } = gridConfig;

  return (
    <div
      ref={gridRef}
      className="animated-grid"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
        justifyContent: "center",
        alignContent: "center",
        perspective: 1000,
      }}
    />
  );
}
