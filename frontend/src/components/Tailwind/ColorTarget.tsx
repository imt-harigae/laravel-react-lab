import { useDroppable } from '@dnd-kit/core';

interface Props {
  id: string;
  colorClass: string;
  children: React.ReactNode;
}

export function ColorTarget({ id, colorClass, children }: Props) {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`p-6 text-xl font-bold border-2 border-dashed rounded min-h-[100px] transition 
        ${colorClass} ${isOver ? 'scale-105 border-blue-500' : ''}`}
    >
      {children}
    </div>
  );
}
