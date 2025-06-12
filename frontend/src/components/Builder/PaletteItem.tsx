import { useDraggable } from "@dnd-kit/core";
import type { UniqueIdentifier } from "@dnd-kit/core";

type Props = {
  id: UniqueIdentifier;
  label: string;
};

export default function PaletteItem({ id, label }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0.5 : 1,
    padding: 8,
    border: "1px solid #ccc",
    borderRadius: 4,
    backgroundColor: "white",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {label}
    </div>
  );
}
