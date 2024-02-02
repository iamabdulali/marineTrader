import React from "react";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AfroStyles } from "../../utils/DummyData";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

const SwiperSlider = () => {
  const [nav1, setNav1] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slider1, setSlider1] = useState(null);
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
    nextArrow: <FaChevronCircleRight color="#fff" size={30} />,
    prevArrow: <FaChevronCircleLeft color="#fff" size={30} />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const thumbSetting = {
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 1,
    infinite: false,
    gap: 30,
  };

  return (
    <>
      <div className="mt-3">
        <Slider
          {...settings}
          asNavFor={nav1}
          ref={(slider) => setSlider1(slider)}
        >
          {AfroStyles.map((item) => (
            <div key={item.id} className="max-h-[560px]">
              <img className="w-full" src={item.src} alt={item.alt} />
            </div>
          ))}
        </Slider>
        <Slider {...thumbSetting} className="mt-4">
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
    </>
  );
};

export default SwiperSlider;
