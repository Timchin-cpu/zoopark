import React from "react";
import "./styles.scss";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { routeMain } from "pages/MainPage";
import { routeCity } from "pages/CityPage";
import { routeFriends } from "pages/FriendsPage";
import { routeShop } from "pages/ShopPage";
import { routePeople } from "pages/PeoplePage";

import GameDefaultWhite from "assets/img/game-default.svg";
import GameActiveWhite from "assets/img/game-active.svg";
import GameDefaultDark from "assets/img/game-default-dark.svg";
import GameActiveDark from "assets/img/game-active-dark.svg";

import CityDefaultWhite from "assets/img/city-default.svg";
import CityActiveWhite from "assets/img/city-active.svg";
import CityDefaultDark from "assets/img/city-default-dark.svg";
import CityActiveDark from "assets/img/city-active-dark.svg";

import PeopleDefaultWhite from "assets/img/people-default.svg";
import PeopleActiveWhite from "assets/img/people-active.svg";
import PeopleDefaultDark from "assets/img/people-default-dark.svg";
import PeopleActiveDark from "assets/img/people-active-dark.svg";

import FriendsDefaultWhite from "assets/img/friends-default.svg";
import FriendsActiveWhite from "assets/img/friends-active.svg";
import FriendsDefaultDark from "assets/img/friends-default-dark.svg";
import FriendsActiveDark from "assets/img/friends-active-dark.svg";

import ShopDefaultWhite from "assets/img/shop-default.svg";
import ShopActiveWhite from "assets/img/shop-active.svg";
import ShopDefaultDark from "assets/img/shop-default-dark.svg";
import ShopActiveDark from "assets/img/shop-active-dark.svg";

const MobileNav = () => {
  return (
    <div className="mobile-nav">
      <ul className="mobile-menu f-center-jcsb">
        <li className="mobile-menu__item">
          <NavLink
            to={routeMain()}
            className="mobile-menu__card"
            activeClassName={"active"}
          >
            <div className="mobile-menu__icon f-center-center">
              <div className="mobile-menu__icon_white">
                <img
                  src={GameDefaultWhite}
                  alt=""
                  className="mobile-menu__icon_white-default"
                />
                <img
                  src={GameActiveWhite}
                  alt=""
                  className="mobile-menu__icon_white-active"
                />
              </div>
              <div className="mobile-menu__icon_dark">
                <img
                  src={GameDefaultDark}
                  alt=""
                  className="mobile-menu__icon_dark-default"
                />
                <img
                  src={GameActiveDark}
                  alt=""
                  className="mobile-menu__icon_dark-active"
                />
              </div>
            </div>
            <p className="mobile-menu__title">Игра</p>
          </NavLink>
        </li>
        <li className="mobile-menu__item">
          <NavLink to={routeCity()} className="mobile-menu__card">
            <div className="mobile-menu__icon f-center-center">
              <div className="mobile-menu__icon f-center-center">
                <div className="mobile-menu__icon_white">
                  <img
                    src={CityDefaultWhite}
                    alt=""
                    className="mobile-menu__icon_white-default"
                  />
                  <img
                    src={CityActiveWhite}
                    alt=""
                    className="mobile-menu__icon_white-active"
                  />
                </div>
                <div className="mobile-menu__icon_dark">
                  <img
                    src={CityDefaultDark}
                    alt=""
                    className="mobile-menu__icon_dark-default"
                  />
                  <img
                    src={CityActiveDark}
                    alt=""
                    className="mobile-menu__icon_dark-active"
                  />
                </div>
              </div>
            </div>
            <p className="mobile-menu__title">Город</p>
          </NavLink>
        </li>
        <li className="mobile-menu__item">
          <NavLink to={routePeople()} className="mobile-menu__card">
            <div className="mobile-menu__icon f-center-center">
              <div className="mobile-menu__icon_white">
                <img
                  src={PeopleDefaultWhite}
                  alt=""
                  className="mobile-menu__icon_white-default"
                />
                <img
                  src={PeopleActiveWhite}
                  alt=""
                  className="mobile-menu__icon_white-active"
                />
              </div>
              <div className="mobile-menu__icon_dark">
                <img
                  src={PeopleDefaultDark}
                  alt=""
                  className="mobile-menu__icon_dark-default"
                />
                <img
                  src={PeopleActiveDark}
                  alt=""
                  className="mobile-menu__icon_dark-active"
                />
              </div>
            </div>
            <p className="mobile-menu__title">Жители</p>
          </NavLink>
        </li>
        <li className="mobile-menu__item">
          <NavLink to={routeFriends()} className="mobile-menu__card">
            <div className="mobile-menu__icon f-center-center">
              <div className="mobile-menu__icon_white">
                <img
                  src={FriendsDefaultWhite}
                  alt=""
                  className="mobile-menu__icon_white-default"
                />
                <img
                  src={FriendsActiveWhite}
                  alt=""
                  className="mobile-menu__icon_white-active"
                />
              </div>
              <div className="mobile-menu__icon_dark">
                <img
                  src={FriendsDefaultDark}
                  alt=""
                  className="mobile-menu__icon_dark-default"
                />
                <img
                  src={FriendsActiveDark}
                  alt=""
                  className="mobile-menu__icon_dark-active"
                />
              </div>
            </div>
            <p className="mobile-menu__title">Друзья</p>
          </NavLink>
        </li>
        <li className="mobile-menu__item">
          <NavLink to={routeShop()} className="mobile-menu__card">
            <div className="mobile-menu__icon f-center-center">
              <div className="mobile-menu__icon_white">
                <img
                  src={ShopDefaultWhite}
                  alt=""
                  className="mobile-menu__icon_white-default"
                />
                <img
                  src={ShopActiveWhite}
                  alt=""
                  className="mobile-menu__icon_white-active"
                />
              </div>
              <div className="mobile-menu__icon_dark">
                <img
                  src={ShopDefaultDark}
                  alt=""
                  className="mobile-menu__icon_dark-default"
                />
                <img
                  src={ShopActiveDark}
                  alt=""
                  className="mobile-menu__icon_dark-active"
                />
              </div>
            </div>
            <p className="mobile-menu__title">Магазин</p>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default MobileNav;
