import { Menu } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { links } from "../../utils/DummyData";

const ListingMenu = ({ openDeleteModal, id, make, model, category, year }) => {
  const handleDeleteButtonClick = () => {
    openDeleteModal(true);
  };
  return (
    <>
      <div>
        <Menu.Items className="absolute bg-white custom-shadow rounded-lg px-4 pb-4 right-7 ">
          {links.map(({ href, colorChange, label, onClick }) => {
            return (
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
                      to={
                        label.props.children[1] === " Edit"
                          ? `/selling/buildAd/advert/${id}`
                          : `/listings/${category?.name}/${make?.name}-${model?.name}-${year}/${id}`
                      }
                      className={`flex items-center gap-4  ${
                        colorChange ? "text-[#FC4040]" : "text-[#11133D]"
                      } text-base font-medium mt-4`}
                    >
                      {label}
                    </Link>
                  )
                }
              </Menu.Item>
            );
          })}
        </Menu.Items>
      </div>
    </>
  );
};

export default ListingMenu;
