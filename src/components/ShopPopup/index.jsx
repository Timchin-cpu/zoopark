import React, { useEffect, useRef } from 'react';

import './styles.scss';

import DefaultImg from 'assets/img/default-img.png';
import TimeIcon from 'assets/img/time-icon.svg';

import StarIcon from 'assets/img/star-icon.svg';
import CoinIcon from 'assets/img/coin-icon.svg';

const ShopPopup = (props) => {


    const popupRef = useRef(null);
    const { setActivePopup } = props;

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (popupRef.current && !popupRef.current.contains(event.target)) {
            document.documentElement.classList.remove('fixed');
            console.log('close')
            props.setActivePopup(false);
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [setActivePopup]);

    return (
        <div ref={popupRef} className={`shop-popup ${props.active ? 'show' : ''}`}>
            <div className="shop-popup__wrapper">
                <button type="button" className='shop-popup__close' onClick={props.handleClosePopup}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" fill='#AAB2BD'/></svg>
                </button>
                <div className="shop-popup__inner">
                    <div className="shop-popup__image">
                        <img src={DefaultImg} alt="" />
                    </div>
                    <div className="shop-popup__content">
                        <h3 className="shop-popup__title">
                            Название карты
                        </h3>
                        <p className="shop-popup__text">
                            Инвестирование для начинающих
    как читать торговые графики
                        </p>
                        <div className="shop-popup__earn">
                            <div className="main-params__card f-center-center">
                                <div className="main-params__icon f-center-center">
                                    <img src={TimeIcon} alt="" />
                                </div>
                                <p className="main-params__title">
                                    18,09 K/H
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="shop-popup__params">
                        <ul className="friends-params f-center-center">
                            <li className="friends-params__item f-center">
                                <img src={StarIcon} alt="" />
                                500 EXP
                            </li>
                            <li className="friends-params__item f-center">
                                <img src={CoinIcon} alt="" />
                                2000
                            </li>
                        </ul>
                    </div>
                    <button type="button" className='shop-popup__btn' onClick={props.handleClosePopup}>
                        {!props.main ? 'Купить' : 'Ок'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ShopPopup;