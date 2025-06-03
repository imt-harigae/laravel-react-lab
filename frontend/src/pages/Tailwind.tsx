// src/pages/Tailwind.tsx
import { DndContext } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { useState } from 'react';
import { ColorSwatch } from '../components/Tailwind/ColorSwatch';
import { ColorTarget } from '../components/Tailwind/ColorTarget';
import { colorMap } from '../constants/colorMap';

export default function TailwindPage() {
    const [count, setCount] = useState(0);

    const [color, setColor] = useState<string>('bg-white');

    const handleDragEnd = (event: DragEndEvent) => {
        const draggedColor = event.active.id as keyof typeof colorMap;
        const isDropped = event.over?.id === 'text';
        if (isDropped) {
            setColor(colorMap[draggedColor]);
        }
    };

  return (
    <DndContext onDragEnd={handleDragEnd}>
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center p-4">
            <h1 className="text-4xl font-bold text-blue-600 mb-4">
                Tailwind Test Page
            </h1>

            {/* ボタンと説明文 */}
            <div className="px-8 py-8 bg-gray-100">
                <div className=" md:flex-row gap-8 w-full">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        onClick={() => setCount(count + 1)}
                    >
                        count is {count}
                    </button>
                    <p className="mt-4 text-gray-700">
                        追加ライブラリ：Tailwind CSS
                    </p>
                </div>
            </div>

            {/* DnD カラー選択エリア */}
            <div className="w-full px-8 py-8 bg-gray-100">
                <div className="flex flex-col md:flex-row gap-8 w-full">
                    {/* カラー一覧 */}
                    <div className="flex flex-col gap-2">
                    {Object.entries(colorMap).map(([id, colorClass]) => (
                        <ColorSwatch key={id} id={id} colorClass={colorClass} />
                    ))}
                    </div>

                    {/* テキスト表示 */}
                    <div className="flex-1 flex items-center justify-center">
                    <ColorTarget id="text" colorClass={color}>
                        ドロップで色が変わります
                    </ColorTarget>
                    </div>
                </div>
                <p className="mt-4 text-gray-700">
                    追加ライブラリ：@dnd-kit/core
                </p>
            </div>
        </div>
    </DndContext>
  );
}
