import React from "react";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AfroStyles } from "../../utils/DummyData";
import {
  FaChevronCircleLeft,
  FaChevronCircleRight,
  FaChevronLeft,
  FaChevronRight,
  FaTimesCircle,
} from "react-icons/fa";

const SwiperSlider = () => {
  const [nav1, setNav1] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slider1, setSlider1] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const openModal = (index) => {
    setModalIndex(index);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    setNav1(slider1);
  }, [slider1]);

  const settings = {
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    onReInit: () => setCurrentSlide(slider1?.innerSlider.state.currentSlide),
    autoplaySpeed: 1000,
    lazyLoad: true,
    asNavFor: ".slider-nav",
    nextArrow: <FaChevronRight color="#fff" />,
    prevArrow: <FaChevronLeft color="#fff" />,
    // responsive: [
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 2,
    //     },
    //   },
    //   {
    //     breakpoint: 600,
    //     settings: {
    //       slidesToShow: 1,
    //     },
    //   },
    // ],
  };

  const thumbSetting = {
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 1,
    infinite: false,
  };

  return (
    <div className="relative">
      <div className="mt-3">
        <Slider
          className="main-slider"
          {...settings}
          asNavFor={nav1}
          ref={(slider) => setSlider1(slider)}
        >
          {AfroStyles.map((item, idx) => (
            <div
              key={item.id}
              className="max-h-[560px]"
              onClick={() => openModal(idx)}
            >
              <img
                className="w-full sm:min-h-[560px] sm:max-h-[560px] min-h-[211px] max-h-[211px] object-cover"
                src={item.src}
                alt={item.alt}
              />
            </div>
          ))}
        </Slider>
        <div className="md:block hidden">
          <Slider {...thumbSetting} className="mt-4 thumb-slider">
            {AfroStyles.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => {
                  slider1?.slickGoTo(idx);
                }}
              >
                <img
                  src={item.src}
                  className="max-h-[128px] w-full min-h-[128px] object-cover"
                  alt={item.alt}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      {modalIsOpen && (
        <div className="modal-overlay fixed z-[9999999] flex flex-col justify-center 2xl:px-24 sm:px-10 px-4 left-0 right-0 bg-black bg-opacity-85 top-0 bottom-0">
          <div className="modal-content h-[95vh] overflow-hidden">
            <Slider
              {...settings}
              className="modal-slider"
              slidesToShow={1}
              slidesToScroll={1}
              infinite={false}
              initialSlide={modalIndex}
            >
              {AfroStyles.map((item) => (
                <div key={item.id}>
                  <img
                    className="w-full min-h-[95vh] object-contain"
                    src={item.src}
                    alt={item.alt}
                  />
                </div>
              ))}
            </Slider>
            <button
              onClick={closeModal}
              className="absolute top-5 right-10 z-[99999999999] "
            >
              <FaTimesCircle color="#fff" size={35} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SwiperSlider;
