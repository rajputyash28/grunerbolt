import React from 'react';
import { X } from 'lucide-react';

interface ErrorMessageProps {
  message: string | null;
  onClose: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-md p-4">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-800" style={{ fontFamily: "Poppins" }}>
            {message}
          </p>
        </div>
        <div className="ml-auto pl-3">
          <button
            onClick={onClose}
            className="text-red-400 hover:text-red-600"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
