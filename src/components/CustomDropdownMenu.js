import { Menu, Transition } from "@headlessui/react";

export default function CustomDropdownMenu({
  buttonToOpenMenu,
  buttonStyles,
  children,
}) {
  return (
    <Menu>
      <Menu.Button className={`${buttonStyles}`}>
        {buttonToOpenMenu}
      </Menu.Button>
      <Transition
        className="relative z-10"
        enter="transition duration-500 ease-out"
        enterFrom=" transition duration-500 opacity-0"
        enterTo=" transition duration-500 opacity-100"
        leave="transition duration-500 ease-out"
        leaveFrom=" transition duration-500 opacity-100"
        leaveTo=" transition duration-500 opacity-0"
      >
        {children}
      </Transition>
    </Menu>
  );
}
