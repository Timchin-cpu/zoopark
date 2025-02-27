import React, { useState, useEffect } from "react";
import routePeople from "./routes";
import MainSection from "components/MainSection";
import { peopleService, userCardsService } from "services/api";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import InfoIcon from "assets/img/icons8-info-48.png";

import DefaultImg from "assets/img/default-img.png";
import MobileNav from "components/MobileNav";
import ShopPopup from "components/ShopPopup";

const PeoplePage = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [policePhotos, setPolicePhotos] = useState([]);
  // const [firefighterPhotos, setFirefighterPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  // const [selectedTitle, setSelectedTitle] = useState(null);
  // const [selectedDesc, setSelectedDesc] = useState(null);
  // const [selectedPrice, setSelectedPrice] = useState(null);
  // const [selectedExperience, setSelectedExperience] = useState(null);

  const [activePopup, setActivePopup] = useState(false);
  const [userCards, setUserCards] = useState([]);

  useEffect(() => {
    const fetchUserCards = async () => {
      try {
        const tg = window.Telegram.WebApp;
        const telegram_id = tg.initDataUnsafe?.user?.id;
        if (!telegram_id) {
          console.error("Telegram ID not found");
          return;
        }
        const response = await userCardsService.getUserCards(telegram_id); // ID пользователя
        setUserCards(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserCards();
  }, []);
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const policeData = await peopleService.getPolicePhotos();
        // const firefighterData = await peopleService.getFirefighterPhotos();

        setPolicePhotos(policeData);
        console.log(policeData);
        // setFirefighterPhotos(firefighterData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPhotos();
  }, []);
  const [openAccordion, setOpenAccordion] = useState(null);

  const handleAccordionClick = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const handleOpenPopup = (photo) => {
    document.documentElement.classList.add("fixed");
    console.log(photo);
    setSelectedPhoto(photo);

    setActivePopup(true);
  };
  // const handleOpenPopup1 = (photo) => {
  //   document.documentElement.classList.add("fixed");
  //   setSelectedPhoto(photo);
  //   setActivePopup(true);
  // };
  const handleClosePopup = () => {
    document.documentElement.classList.remove("fixed");
    setActivePopup(false);
  };

  return (
    <section className="city">
      <div className="container">
        <div className="city-inner">
          <MainSection />
          <ul className="city-list">
            <li className="city-list__item block-style">
              <div
                className={`city-list__title f-center-jcsb ${
                  openAccordion === 1 ? "active" : ""
                }`}
              >
                Полиция{" "}
                <div
                  className="info-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowInfo(!showInfo);
                  }}
                >
                  <img src={InfoIcon} alt="" className="infoIcon" />
                  {/* <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7.5" stroke="#AAB2BD" />
                    <text x="8" y="11" textAnchor="middle" fill="#AAB2BD">
                      ?
                    </text>
                  </svg> */}
                </div>
                {showInfo && (
                  <div className="info-popup">
                    <div className="info-popup__content">
                      <p>Информация о полиции</p>
                      <button
                        className="info-popup__close"
                        onClick={() => setShowInfo(false)}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )}
                <div className="city-list__more f-center">
                  <div className="city-list__count">5 из 12</div>
                  <div
                    className="city-list__arrow"
                    onClick={() => handleAccordionClick(1)}
                  >
                    <svg
                      width="15"
                      height="9"
                      viewBox="0 0 15 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.6592 1.56103L8.23438 8.13525C8.08496 8.29297 7.88574 8.38428 7.66992 8.38428C7.4624 8.38428 7.25488 8.29297 7.11377 8.13525L0.688966 1.56103C0.547853 1.42822 0.464845 1.2373 0.464845 1.02148C0.464845 0.589842 0.788575 0.266112 1.22022 0.266112C1.42774 0.266112 1.62695 0.340819 1.75977 0.481932L7.66992 6.5249L13.5884 0.481933C13.7129 0.34082 13.9121 0.266113 14.1279 0.266113C14.5596 0.266113 14.8833 0.589844 14.8833 1.02148C14.8833 1.2373 14.8003 1.42822 14.6592 1.56103Z"
                        fill="#AAB2BD"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div
                className="city-list__content"
                style={{
                  maxHeight: openAccordion === 1 ? "500px" : "0px",
                  paddingTop: openAccordion === 1 ? "24px" : "0px",
                  paddingBottom: openAccordion === 1 ? "10px" : "0px",
                }}
              >
                {" "}
                <div className="city-slider">
                  <Swiper spaceBetween={8} slidesPerView={"auto"}>
                    {policePhotos.map((photo) => (
                      <SwiperSlide key={photo.id}>
                        <div className="city-slider__item">
                          <div
                            className="city-slider__card"
                            onClick={() => handleOpenPopup(photo)}
                            style={{
                              opacity: userCards.some(
                                (card) => card.id === photo.id
                              )
                                ? 1
                                : 0.5,
                            }}
                          >
                            <p className="city-slider__image">
                              <img
                                src={`http://localhost:3000${photo.image}`}
                                alt={photo.title}
                              />
                            </p>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </li>
            <li className="city-list__item block-style">
              <div
                className={`city-list__title f-center-jcsb ${
                  openAccordion === 2 ? "active" : ""
                }`}
                onClick={() => handleAccordionClick(2)}
              >
                Пожарные
                <div className="city-list__more f-center">
                  <div className="city-list__count">5 из 12</div>
                  <div className="city-list__arrow">
                    <svg
                      width="15"
                      height="9"
                      viewBox="0 0 15 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.6592 1.56103L8.23438 8.13525C8.08496 8.29297 7.88574 8.38428 7.66992 8.38428C7.4624 8.38428 7.25488 8.29297 7.11377 8.13525L0.688966 1.56103C0.547853 1.42822 0.464845 1.2373 0.464845 1.02148C0.464845 0.589842 0.788575 0.266112 1.22022 0.266112C1.42774 0.266112 1.62695 0.340819 1.75977 0.481932L7.66992 6.5249L13.5884 0.481933C13.7129 0.34082 13.9121 0.266113 14.1279 0.266113C14.5596 0.266113 14.8833 0.589844 14.8833 1.02148C14.8833 1.2373 14.8003 1.42822 14.6592 1.56103Z"
                        fill="#AAB2BD"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div
                className="city-list__content"
                style={{
                  maxHeight: openAccordion === 2 ? "500px" : "0px",
                  paddingTop: openAccordion === 2 ? "24px" : "0px",
                  paddingBottom: openAccordion === 2 ? "10px" : "0px",
                }}
              >
                <div className="city-slider">
                  <Swiper spaceBetween={8} slidesPerView={"auto"}>
                    <SwiperSlide>
                      <div className="city-slider__item">
                        <div
                          className="city-slider__card"
                          onClick={handleOpenPopup}
                        >
                          <p className="city-slider__image">
                            <img src={DefaultImg} alt="" />
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="city-slider__item">
                        <div
                          className="city-slider__card"
                          onClick={handleOpenPopup}
                        >
                          <p className="city-slider__image">
                            <img src={DefaultImg} alt="" />
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="city-slider__item">
                        <div
                          className="city-slider__card"
                          onClick={handleOpenPopup}
                        >
                          <p className="city-slider__image">
                            <img src={DefaultImg} alt="" />
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="city-slider__item">
                        <div
                          className="city-slider__card"
                          onClick={handleOpenPopup}
                        >
                          <p className="city-slider__image">
                            <img src={DefaultImg} alt="" />
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="city-slider__item">
                        <div
                          className="city-slider__card"
                          onClick={handleOpenPopup}
                        >
                          <p className="city-slider__image">
                            <img src={DefaultImg} alt="" />
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="city-slider__item">
                        <div
                          className="city-slider__card"
                          onClick={handleOpenPopup}
                        >
                          <p className="city-slider__image">
                            <img src={DefaultImg} alt="" />
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="city-slider__item">
                        <div
                          className="city-slider__card"
                          onClick={handleOpenPopup}
                        >
                          <p className="city-slider__image">
                            <img src={DefaultImg} alt="" />
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="city-slider__item">
                        <div
                          className="city-slider__card"
                          onClick={handleOpenPopup}
                        >
                          <p className="city-slider__image">
                            <img src={DefaultImg} alt="" />
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="city-slider__item">
                        <div
                          className="city-slider__card"
                          onClick={handleOpenPopup}
                        >
                          <p className="city-slider__image">
                            <img src={DefaultImg} alt="" />
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="city-slider__item">
                        <div
                          className="city-slider__card"
                          onClick={handleOpenPopup}
                        >
                          <p className="city-slider__image">
                            <img src={DefaultImg} alt="" />
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <ShopPopup
        active={activePopup}
        setActivePopup={setActivePopup}
        main={true}
        handleClosePopup={handleClosePopup}
        selectedPhoto={selectedPhoto}
      />
      <MobileNav />
    </section>
  );
};

export { routePeople };

export default PeoplePage;
