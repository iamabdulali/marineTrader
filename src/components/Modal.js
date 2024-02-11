// import React from "react";

// const Modal = ({ children, className, opacity }) => {
//   return (
//     <div className={`fixed inset-0 w-full h-screen bg-black z-10 ${opacity}`}>
//       <div
//         className={`max-h-screen overflow-y-auto absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 ${className} bg-white z-20 rounded-tr-lg rounded-tl-lg rounded-br-lg rounded-bl-lg`}
//       >
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Modal;

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function Modal({ children, isOpen, onClose, width, padding }) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`${width} transform overflow-hidden rounded-2xl bg-white ${padding} text-left align-middle shadow-xl transition-all`}
                >
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
