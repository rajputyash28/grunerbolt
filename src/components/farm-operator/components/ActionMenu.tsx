import React, { forwardRef } from 'react';
import { Eye, Edit, Ban, Trash } from 'lucide-react';

interface ActionMenuProps {
  onViewProfile: () => void;
  onEdit: () => void;
  onBlock: () => void;
  onDelete: () => void;
  operatorStatus: 'Active' | 'Inactive';
}

const ActionMenu = forwardRef<HTMLDivElement, ActionMenuProps>(({
  onViewProfile,
  onEdit,
  onBlock,
  onDelete,
  operatorStatus
}, ref) => {
  return (
    <div ref={ref} className="absolute right-6 top-10 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
      <div className="py-1">
        <button
          onClick={onViewProfile}
          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <Eye size={16} />
          View Details
        </button>
        <button
          onClick={onEdit}
          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <Edit size={16} />
          Edit
        </button>
        <button
          onClick={onBlock}
          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <Ban size={16} />
          {operatorStatus === 'Active' ? 'Block' : 'Unblock'}
        </button>
        <button
          onClick={onDelete}
          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
        >
          <Trash size={16} />
          Delete
        </button>
      </div>
    </div>
  );
});

ActionMenu.displayName = 'ActionMenu';

export default ActionMenu;