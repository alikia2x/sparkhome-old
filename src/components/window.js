import React, { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';

const Window = ({ onClose, content }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    useEffect(() => {
      setIsOpen(true);
  
      return () => {
        setIsOpen(false);
      };
    }, []);
  
    const handleClose = () => {
      setIsOpen(false);
      setTimeout(onClose, 300); // Wait for the fade-out animation to complete before closing
    };
  
    return (
      <Transition
        show={isOpen}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-4">
            <div className="flex justify-end">
              <button
                className="p-2 hover:bg-gray-200 rounded-full"
                onClick={handleClose}
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4">{content}</div>
          </div>
        </div>
      </Transition>
    );
  };
  
export default Window;