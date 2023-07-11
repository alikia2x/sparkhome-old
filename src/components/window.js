import React, {useState, useEffect} from 'react';
import {XMarkIcon} from '@heroicons/react/24/outline';
import {Transition} from '@headlessui/react';

const Window = ({onClose, content}) => {
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
            enter="transition-all duration-150"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-md"
            leave="transition-all duration-250"
            leaveFrom="opacity-100 backdrop-blur-md"
            leaveTo="opacity-0 backdrop-blur-none"
            className="absolute h-screen w-screen top-0 left-0 z-20"
        >
            <div className="fixed inset-0 flex items-center justify-center">
                <div
                    className="w-[85vw] sm:w-128 lg:w-144 xl:w-168
                    h-144 lg:h-160 mh:h-128 st:h-96 2xst:h-80
                    bg-white rounded-lg dark:bg-neutral-900 dark:text-slate-200">
                    <div className="relative h-10 w-full">
                        <button
                            className="absolute rounded-md
                            w-12 h-8 mt-1 mr-1 pl-5 right-0
                            hover:bg-gray-200 focus:bg-gray-200
                            dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                            onClick={handleClose}
                        >
                            <XMarkIcon className="w-5 h-5 md:w-6 md:h-6 st:h-5 st:w-5"/>
                        </button>
                    </div>
                    <div className="overflow-scroll pl-4 pr-4 h-">{content}</div>
                </div>
            </div>
        </Transition>
    );
};

export default Window;