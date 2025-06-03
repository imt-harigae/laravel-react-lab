import { useState, useRef } from "react";
import { DndContext } from "@dnd-kit/core";
import type { DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";

import PaletteItem from "../components/PaletteItem";
import Canvas from "../components/Canvas";

const paletteItems = [
  { id: "section", label: "Section" },
  { id: "input", label: "Input" },
  { id: "textarea", label: "Textarea" },
];

export default function BuilderPage() {
  const [canvasItems, setCanvasItems] = useState<UniqueIdentifier[]>([]);
  const canvasRef = useRef<HTMLDivElement>(null);

  function handleDragEnd(event: DragEndEvent) {
    const { over, active } = event;
    if (over?.id === "canvas") {
      setCanvasItems((items) => [...items, active.id]);
    }
  }

  // クリックでキャンバスのHTMLをコピーする関数
  function handleCopyHTML() {
    if (!canvasRef.current) return;

    // キャンバスの内側HTMLを取得
    const html = canvasRef.current.innerHTML;

    // クリップボードに書き込み
    navigator.clipboard.writeText(html)
      .then(() => alert("キャンバスのHTMLをコピーしました"))
      .catch(() => alert("コピーに失敗しました"));
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex h-screen">
        {/* パレット */}
        <aside className="w-64 bg-gray-100 p-4 border-r">
          <h2 className="text-lg font-semibold mb-4 text-gray-500">パレット</h2>
          <div className="flex flex-col gap-2 text-gray-700">
            {paletteItems.map(({ id, label }) => (
              <PaletteItem key={String(id)} id={id} label={label} />
            ))}
          </div>
        </aside>

        {/* キャンバス */}
        <main className="flex-1 p-8 bg-gray-50 flex flex-col">
            <div className="flex justify-end">
                <button onClick={handleCopyHTML} className="m-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    HTMLをコピー
                </button>
            </div>
            <Canvas items={canvasItems} ref={canvasRef} />
        </main>
      </div>
    </DndContext>
  );
}
