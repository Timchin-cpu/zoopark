import React, { useState } from "react";
import routeMain from "./routes";
import MainSection from "components/MainSection";
import MobileNav from "components/MobileNav";

// import DefaultImg from 'assets/img/default-card.png';

// import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/scss";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// Import Swiper modules
// import { EffectCoverflow } from 'swiper/modules';
import ShopPopup from "components/ShopPopup";
import MainCarousel from "components/MainCarousel";

const MainPage = () => {
  const [activeShopPopup, setActiveShopPopup] = useState(false);

  // const swiperRef = useRef(null);

  // slideChange
  // const handleSlideChange = () => {
  //     if (swiperRef.current) {
  //       console.log("Current active index:", swiperRef.current.swiper.activeIndex);
  //     }
  //   };

  //   const goToNextSlide = () => {
  //     if (swiperRef.current) {
  //       swiperRef.current.slideNext();
  //     }
  //   };

  const handleOpenPopup = () => {
    setTimeout(function () {
      document.documentElement.classList.add("fixed");
      setActiveShopPopup(true);
    }, 1000);
  };

  const handleClosePopup = () => {
    document.documentElement.classList.remove("fixed");
    setActiveShopPopup(false);
  };

  return (
    <section className="main">
      <div className="container">
        <div className="friends-inner">
          <MainSection />
          <div className="main-game">
            <MainCarousel
              getActiveSlide={3}
              handleOpenPopup={handleOpenPopup}
            />
          </div>
        </div>
      </div>
      <ShopPopup
        active={activeShopPopup}
        main={true}
        setActivePopup={setActiveShopPopup}
        handleClosePopup={handleClosePopup}
      />
      <MobileNav />
    </section>
  );
};

export { routeMain };

export default MainPage;
