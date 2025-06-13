import { useState, type ReactNode } from "react";

type ZoomWrapperProps = {
  children: ReactNode;
  className?: string;
  zoomScale?: number;
  transitionDuration?: number;
  style?: React.CSSProperties;
};

export default function ZoomWrapper({
  children,
  className = "",
  zoomScale = 1.2,
  transitionDuration = 300,
  style = {},
}: ZoomWrapperProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div
      tabIndex={0}
      className={`relative w-full overflow-hidden cursor-pointer ${className}`}
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
      onFocus={() => setIsZoomed(true)}
      onBlur={() => setIsZoomed(false)}
      style={{ ...style }}
    >
      <div
        style={{
          transition: `transform ${transitionDuration}ms ease-out`,
          transformOrigin: "center center",
          transform: isZoomed ? `scale(${zoomScale})` : "scale(1)",
          willChange: "transform",
          width: "100%",
          height: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
}
