import React from 'react';
import { X } from 'lucide-react';
import { ConfirmationType } from './types';

interface ConfirmationDialogProps {
  show: boolean;
  type: ConfirmationType;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  show,
  type,
  onClose,
  onConfirm
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-80 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black"
        >
          <X size={20} />
        </button>
        <h2 className="text-lg font-bold text-center mb-4">
          {type === 'delete' ? 'Delete Task' : 'Assign Task'}
        </h2>
        <p className="text-center mb-6">
          Are you sure you want to {type === 'delete' ? 'delete' : 'assign'} this Task?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-blue-500 text-black rounded-md"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-black text-white rounded-md"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
