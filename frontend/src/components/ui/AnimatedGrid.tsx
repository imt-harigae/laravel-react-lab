import { useEffect, useRef } from "react";
import gsap from "gsap";

interface AnimatedGridProps {
    size?: string;
}

export default function AnimatedGrid(
    { size = "60px" }: AnimatedGridProps
) {
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const rects: HTMLDivElement[] = [];
        if (gridRef.current) {

        // 一旦すべて削除（StrictModeで2回動いても問題なし）
        gridRef.current.innerHTML = "";

        for (let i = 0; i < 276; i++) {
            const rect = document.createElement("div");
            rect.classList.add("animated-rect");
            rect.style.backgroundColor = "white";
            rect.style.width = size;
            rect.style.height = size;
            rect.style.display = "block";
            gridRef.current.appendChild(rect);
            rects.push(rect);
        }

        gsap.from(rects, {
            repeat: -1, // 無限に繰り返し
            repeatDelay: 0.5, // 繰り返し時に0.5秒の待機
            yoyo: true, // 逆方向にもアニメーションを適用
            scale: 0,
            duration: 1,
            ease: "power4.out",
            autoAlpha: 0,
            stagger: {
                each: 0.05,
                from: "center", // 中央から
                grid: "auto", // 格子状に開始
                ease: "power4.out", // 間隔に対するイージング
            },
        });
        }

        // クリーンアップ（再マウント時に再生成を防ぐ）
        return () => {
        if (gridRef.current) {
            gridRef.current.innerHTML = "";
        }
        };
    }, []);

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill," + size + ")",
                gap: "4px",
                justifyContent: "center",
                maxWidth: "90vw",
                margin: "0 auto"
            }}
            ref={gridRef}>
        </div>);
}