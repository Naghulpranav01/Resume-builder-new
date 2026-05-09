import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

export function SortableItem(props: { id: string; title: string; children: React.ReactNode }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="p-4 mb-4 rounded-xl border border-white/10 bg-black/20 group">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">{props.title}</h3>
        <button {...attributes} {...listeners} className="p-1 rounded hover:bg-white/10 text-gray-500 hover:text-white cursor-grab active:cursor-grabbing">
          <GripVertical className="w-4 h-4" />
        </button>
      </div>
      <div>
        {props.children}
      </div>
    </div>
  );
}
