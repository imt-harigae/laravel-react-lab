import { forwardRef } from "react";
import { useDroppable } from "@dnd-kit/core";
import type { UniqueIdentifier } from "@dnd-kit/core";

type Props = {
  items: UniqueIdentifier[];
};

const Canvas = forwardRef<HTMLDivElement, Props>(({ items }, ref) => {
  const { isOver, setNodeRef } = useDroppable({ id: "canvas" });

  const style = {
    minHeight: 400,
    border: "2px dashed gray",
    backgroundColor: isOver ? "#e0f7fa" : "white",
    borderColor: isOver ? "blue" : "gray",
    padding: 16,
    borderRadius: 8,
  };

  function setRefs(node: HTMLDivElement | null) {
    setNodeRef(node);
    if (typeof ref === "function") {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  }

  const renderItem = (id: UniqueIdentifier) => {
    switch (id) {
      case "section":
        return <section className="p-2 border rounded bg-gray-100">Sectionコンテンツ</section>;
      case "input":
        return <input type="text" placeholder="Input" className="w-full p-1 border rounded" />;
      case "textarea":
        return <textarea placeholder="Textarea" className="w-full p-1 border rounded" />;
      default:
        return <div>{id}</div>;
    }
  };

  return (
    <div ref={setRefs} style={style}>
      {items.length === 0 && <p className="text-gray-400">ここにドラッグ＆ドロップしてください</p>}
      {items.map((id, index) => (
        <div key={index} className="mb-2">
          {renderItem(id)}
        </div>
      ))}
    </div>
  );
});

Canvas.displayName = "Canvas";

export default Canvas;
