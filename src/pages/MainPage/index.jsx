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

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [shouldUpdateCarousel, setShouldUpdateCarousel] = useState(false);
  const [hourlyIncome, setHourlyIncome] = useState(0);
  const [coins, setCoins] = useState(0);
  console.log(coins);
  // const [accumulatedCoins, setAccumulatedCoins] = useState(0);
  const handleOpenPopup = (photo) => {
    setTimeout(function () {
      document.documentElement.classList.add("fixed");
      setSelectedPhoto(photo);
      setActiveShopPopup(true);
      // Update hourly income and coins when card is opened
      if (photo) {
        setHourlyIncome((prev) => prev + (photo.hourly_income || 0));
        const newCoins = photo.price || 0;
        setCoins((prevCoins) => {
          const updatedCoins = prevCoins + newCoins;
          return updatedCoins;
        });
      }
    }, 1000);
  };
  const handleClosePopup = () => {
    document.documentElement.classList.remove("fixed");
    setActiveShopPopup(false);
  };

  const handlePopupButtonClick = () => {
    setShouldUpdateCarousel(true);
  };
  return (
    <section className="main">
      <div className="container">
        <div className="friends-inner">
          <MainSection hourlyIncome={hourlyIncome} coins={coins} />
          <div className="main-game">
            <MainCarousel
              getActiveSlide={3}
              handleOpenPopup={(photo) => handleOpenPopup(photo)}
              shouldUpdate={shouldUpdateCarousel}
              onUpdateComplete={() => setShouldUpdateCarousel(false)}
            />
          </div>
        </div>
      </div>
      <ShopPopup
        active={activeShopPopup}
        main={true}
        setActivePopup={setActiveShopPopup}
        handleClosePopup={handleClosePopup}
        selectedPhoto={selectedPhoto}
        onButtonClick={handlePopupButtonClick}
      />
      <MobileNav />
    </section>
  );
};

export { routeMain };

export default MainPage;
