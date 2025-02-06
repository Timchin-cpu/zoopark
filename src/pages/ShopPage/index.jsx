import React, { useState, useRef, useEffect } from "react";
import routeShop from "./routes";
import MainSection from "components/MainSection";
// import MainCarousel from "components/MainCarousel";

import DefaultImg from "assets/img/default-img.png";
import CoinIcon from "assets/img/coin-icon.svg";

import MobileNav from "components/MobileNav";
import ShopPopup from "components/ShopPopup";
import ShopPopupCarousel from "components/ShopPopupCarousel";

const ShopPage = () => {
  const [activePopup, setActivePopup] = useState(false);
  const [activePopupCarousel, setActivePopupCarousel] = useState(false);
  const [activePopupFilter, setActivePopupFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([
    { id: 1, title: "Набор 10 карт", price: 7000 },
    { id: 2, title: "Название карты в 2-3 строки", price: 3000 },
    { id: 3, title: "Название карты в 2-3 строки", price: 9000 },
    { id: 4, title: "Название карты в 2-3 строки", price: 1000 },
    { id: 5, title: "Название карты в 2-3 строки", price: 7000 },
  ]);
  const [filteredItems, setFilteredItems] = useState(items);

  const filterRef = useRef(null);

  // Search handling
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);

    const filtered = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleOpenPopup = () => {
    document.documentElement.classList.add("fixed");
    setActivePopup(true);
  };

  const handleClosePopup = () => {
    document.documentElement.classList.remove("fixed");
    setActivePopup(false);
  };

  // Rest of your existing handlers...

  return (
    <section className="shop">
      <div className="container">
        <div className="shop-inner">
          <MainSection />
          <div className="shop-block">
            <h2 className="section-content__title shop-block__title">
              Магазин
            </h2>
            <div className="shop-block__nav f-center-jcsb">
              <div className="shop-block__search">
                <div className="shop-block__search-icon">
                  <svg>...</svg>
                </div>
                <input
                  type="search"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Поиск..."
                />
              </div>
              {/* Filter button */}
            </div>

            <div className="shop-category">
              <div className="shop-category__item block-style">
                <h2 className="section-content__title">Культурные объекты</h2>
                <ul className="shop-list f-jcsb">
                  {filteredItems.map((item) => (
                    <li key={item.id} className="shop-list__item">
                      <div className="shop-list__card">
                        <div
                          className="shop-list__image"
                          onClick={handleOpenPopup}
                        >
                          <img src={DefaultImg} alt="" />
                        </div>
                        <h3 className="shop-list__title">{item.title}</h3>
                        <div className="shop-list__price f-center">
                          <img src={CoinIcon} alt="" />
                          {item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ShopPopup
        active={activePopup}
        setActivePopup={setActivePopup}
        handleClosePopup={handleClosePopup}
      />
      <ShopPopupCarousel
        active={activePopupCarousel}
        setActivePopup={setActivePopupCarousel}
        handleClosePopup={handleClosePopupCarousel}
      />
      <MobileNav />
    </section>
  );
};

export { routeShop };

export default ShopPage;
