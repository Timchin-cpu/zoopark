import React, { useState, useEffect } from "react";
import routePeople from "./routes";
import MainSection from "components/MainSection";
import { peopleService, userCardsService } from "services/api";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import InfoIcon from "assets/img/icons8-info-48.png";
import QuestionMarkImg from "assets/img/question-mark.png";
import DefaultImg from "assets/img/default-img.png";
import MobileNav from "components/MobileNav";
import ShopPopup from "components/ShopPopup";

const PeoplePage = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [policePhotos, setPolicePhotos] = useState([]);
  const [cardSets, setCardSets] = useState([]); // Добавляем состояние для наборов
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [activePopup, setActivePopup] = useState(false);
  const [userCards, setUserCards] = useState([]);
  const [selectedSetCards, setSelectedSetCards] = useState([]); // Состояние для карт выбранного набора
  useEffect(() => {
    const fetchCardSets = async () => {
      try {
        const response = await axios.get("/card-sets");
        setCardSets(response.data);
      } catch (error) {
        console.error("Error fetching card sets:", error);
      }
    };
    fetchCardSets();
  }, []);
  const fetchSetCards = async (setId) => {
    try {
      const response = await axios.get(`/card-sets/${setId}/cards`);
      setSelectedSetCards(response.data);
    } catch (error) {
      console.error("Error fetching set cards:", error);
    }
  };
  useEffect(() => {
    const fetchUserCards = async () => {
      try {
        const tg = window.Telegram.WebApp;
        const telegram_id = tg.initDataUnsafe?.user?.id;
        if (!telegram_id) {
          console.error("Telegram ID not found");
          return;
        }
        const response = await userCardsService.getUserCards(telegram_id);
        setUserCards(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserCards();
  }, []);
  const [openAccordion, setOpenAccordion] = useState(null);
  const handleAccordionClick = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
    if (id) {
      fetchSetCards(id);
    }
  };
  const handleOpenPopup = (photo) => {
    document.documentElement.classList.add("fixed");
    setSelectedPhoto({
      ...photo,
      image: userCards.some((card) => card.id === photo.id)
        ? photo.image
        : QuestionMarkImg,
    });
    setActivePopup(true);
  };
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
            {cardSets.map((set) => (
              <li key={set.id} className="city-list__item block-style">
                <div
                  className={`city-list__title f-center-jcsb ${
                    openAccordion === set.id ? "active" : ""
                  }`}
                  onClick={() => handleAccordionClick(set.id)}
                >
                  {set.name}
                  <div className="city-list__more f-center">
                    <div className="city-list__count">
                      {
                        userCards.filter((card) =>
                          selectedSetCards.some(
                            (setCard) => setCard.id === card.id
                          )
                        ).length
                      }{" "}
                      из {selectedSetCards.length}
                    </div>
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
                    maxHeight: openAccordion === set.id ? "500px" : "0px",
                    paddingTop: openAccordion === set.id ? "24px" : "0px",
                    paddingBottom: openAccordion === set.id ? "10px" : "0px",
                  }}
                >
                  <div className="city-slider">
                    <Swiper spaceBetween={8} slidesPerView={"auto"}>
                      {selectedSetCards.map((card) => (
                        <SwiperSlide key={card.id}>
                          <div className="city-slider__item">
                            <div
                              className="city-slider__card"
                              onClick={() => handleOpenPopup(card)}
                            >
                              <div className="city-slider__image">
                                <img
                                  src={
                                    userCards.some(
                                      (userCard) => userCard.id === card.id
                                    )
                                      ? `http://localhost:3000${card.image}`
                                      : QuestionMarkImg
                                  }
                                  alt={card.title}
                                />
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ShopPopup
        active={activePopup}
        setActivePopup={setActivePopup}
        handleClosePopup={handleClosePopup}
        selectedPhoto={selectedPhoto}
      />
      <MobileNav />
    </section>
  );
};

export { routePeople };

export default PeoplePage;
