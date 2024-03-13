import { Menu } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { links } from "../../utils/DummyData";

const ListingMenu = ({ openDeleteModal, id }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Function to open the delete modal
  const handleDeleteButtonClick = () => {
    // Invoke the callback function with the desired prop value
    openDeleteModal(true);
  };
  return (
    <>
      <div>
        <Menu.Items className="absolute bg-white custom-shadow rounded-lg px-4 pb-4 right-7 ">
          {links.map(({ href, colorChange, label, onClick }) => (
            /* Use the `active` state to conditionally style the active item. */
            <Menu.Item key={href} as={Fragment}>
              {({ active }) =>
                onClick ? (
                  <p
                    onClick={handleDeleteButtonClick}
                    className={`flex cursor-pointer items-center gap-4  ${
                      colorChange ? "text-[#FC4040]" : "text-[#11133D]"
                    } text-base font-medium mt-4`}
                  >
                    {label}
                  </p>
                ) : (
                  <Link
                    to={`/itemDetails/${id}`}
                    className={`flex items-center gap-4  ${
                      colorChange ? "text-[#FC4040]" : "text-[#11133D]"
                    } text-base font-medium mt-4`}
                  >
                    {label}
                  </Link>
                )
              }
            </Menu.Item>
          ))}
        </Menu.Items>
      </div>
    </>
  );
};

export default ListingMenu;
