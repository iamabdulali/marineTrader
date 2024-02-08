import { Menu } from "@headlessui/react";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { links } from "../../utils/DummyData";

const ListingMenu = () => {
  return (
    <>
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
    </>
  );
};

export default ListingMenu;
