import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { FaEye, FaPencilAlt, FaTrash, FaTrashAlt } from "react-icons/fa";

const links = [
  {
    href: "/list",
    label: (
      <>
        <FaEye /> View
      </>
    ),
    colorChange: false,
  },
  {
    href: "/selling/buildAd",
    label: (
      <>
        <FaPencilAlt /> Edit
      </>
    ),
    colorChange: false,
  },
  {
    href: "/selling",
    label: (
      <>
        <FaTrashAlt /> Delete
      </>
    ),
    colorChange: true,
  },
];

export default function Example({ buttonToOpenMenu }) {
  return (
    <Menu>
      <Menu.Button>{buttonToOpenMenu}</Menu.Button>
      <Transition
        enter="transition duration-500 ease-out"
        enterFrom=" transition duration-500 opacity-0"
        enterTo=" transition duration-500 opacity-100"
        leave="transition duration-500 ease-out"
        leaveFrom=" transition duration-500 opacity-100"
        leaveTo=" transition duration-500 opacity-0"
      >
        <Menu.Items className="absolute bg-white custom-shadow rounded-lg px-4 pb-4 right-14 ">
          {links.map((link) => (
            /* Use the `active` state to conditionally style the active item. */
            <Menu.Item key={link.href} as={Fragment}>
              {({ active }) => (
                <Link
                  to={link.href}
                  className={`flex items-center gap-4  ${
                    link.colorChange ? "text-[#FC4040]" : "text-[#11133D]"
                  } text-base font-medium mt-4`}
                >
                  {link.label}
                </Link>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
