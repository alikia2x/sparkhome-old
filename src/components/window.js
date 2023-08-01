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
            enterFrom="opacity-0 backdrop-blur-none brightness-100"
            enterTo="opacity-100 backdrop-blur-md brightness-75"
            leave="transition-all duration-250"
            leaveFrom="opacity-100 backdrop-blur-md brightness-75"
            leaveTo="opacity-0 backdrop-blur-none brightness-100"
            className="absolute h-screen w-screen top-0 left-0 z-20"
        >
            {/*全屏幕框架*/}
            <div className="fixed inset-0 flex items-center justify-center">
                {/*窗口框体*/}
                <div
                    className="w-[85vw] sm:w-128 lg:w-144 xl:w-168
                    h-144 lg:h-160 mh:h-128 st:h-96 2xst:h-80
                    bg-white rounded-lg dark:bg-neutral-900 dark:text-slate-200">
                    {/*标题栏*/}
                    <div className="relative h-10 lg:h-14 border-b-[1px] border-solid border-neutral-300 w-full">
                        <button
                            className="absolute rounded-md
                            w-12 h-8 lg:w-16 lg:h-10 mt-1 mr-1 lg:mt-2 lg:mr-2 pl-3.5 lg:pl-5 right-0
                            hover:bg-gray-200 focus:bg-gray-200
                            dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                            onClick={handleClose}
                        >
                            <XMarkIcon className="w-5 h-5 lg:w-6 lg:h-6 st:h-5 st:w-5"/>
                        </button>
                    </div>
                    {/*内容*/}
                    <div className="overflow-y-scroll overflow-x-hidden text-justify pl-4 pr-4 pt-4 h-134 lg:h-144
                        mh:h-118 mh:lg:h-114 st:h-86 st:lg:h-82 2xst:h-70 2xst:lg:h-64 w-full break-all">
                        {content}
                    </div>
                </div>
            </div>
        </Transition>
    );
};

export default Window;