import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

interface Props {
  id: string;
  colorClass: string;
}

export function ColorSwatch({ id, colorClass }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
    position: 'relative' as const, // ここで文字列リテラル型にする
    zIndex: isDragging ? 9999 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className={`w-10 h-10 rounded ${colorClass} cursor-pointer`}
    />
  );
}
