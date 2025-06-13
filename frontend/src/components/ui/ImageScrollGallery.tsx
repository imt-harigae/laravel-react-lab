import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ZoomWrapper from "./ZoomWrapper";

type Props = {
  images: string[];
  columnCount?: number;
  durations?: number[]; // 各列のスクロール速度（秒）
};

function shuffleArray<T>(array: T[]): T[] {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function ImageScrollGallery({
  images,
  columnCount = 3,
  durations = [30, 50, 40],
}: Props) {
  const innerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [loadedCount, setLoadedCount] = useState(0);

  const [columns] = useState(() =>
    Array.from({ length: columnCount }, () => shuffleArray(images))
  );

  useEffect(() => {
    if (loadedCount < images.length * columnCount) return;

    innerRefs.current.forEach((inner, index) => {
      if (!inner) return;

      gsap.killTweensOf(inner);
      const height = inner.scrollHeight / 2;
      const direction = index === 1 ? "+=" : "-=";

      gsap.set(inner, { y: index === 1 ? -height : 0 });
      gsap.to(inner, {
        y: `${direction}${height}px`,
        duration: durations[index] ?? 40,
        ease: "none",
        repeat: -1,
      });
    });
  }, [loadedCount, images.length, columnCount, durations]);

  const handleImageLoad = () => {
    setLoadedCount((count) => count + 1);
  };

  return (
    <div className="flex justify-center items-start h-screen bg-black overflow-hidden px-4">
      {columns.map((columnImages, colIndex) => (
        <ImageColumn
          key={colIndex}
          images={[...columnImages, ...columnImages]}
          onImageLoad={handleImageLoad}
          innerRef={(el) => (innerRefs.current[colIndex] = el)}
        />
      ))}
    </div>
  );
}

type ImageColumnProps = {
  images: string[];
  onImageLoad: () => void;
  innerRef: (el: HTMLDivElement | null) => void;
};

function ImageColumn({ images, onImageLoad, innerRef }: ImageColumnProps) {
    return (
      <div className="w-[200px] h-full overflow-hidden mx-2">
        <div ref={innerRef} className="flex flex-col">
          {images.map((src, i) => (
            <div key={i} className="h-[300px] mb-4 rounded-xl overflow-hidden">
              <ZoomWrapper
                zoomScale={2}
                transitionDuration={400}
                className="h-full"
              >
                <img
                  src={src}
                  alt={`image-${i}`}
                  className="w-full h-full object-cover"
                  onLoad={onImageLoad}
                />
              </ZoomWrapper>
            </div>
          ))}
        </div>
      </div>
    );
  }
  