import React, { useState } from "react";
import styles from "./AddEditCard.module.css";
import routeAddEditCard from "./route";
import { useParams } from "react-router-dom";

const AddEditCard = () => {
  const [cardType, setCardType] = useState("citizen"); // or 'city'

  const { id } = useParams(); // Добавить импорт useParams из react-router-dom
  console.log(id);
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };
  console.log(selectedImage);
  console.log(cardType);
  console.log(cardType);
  return (
    <div className={styles.contents}>
      <div className={styles.mainContent}>
        <div className={styles.content}>
          <div>
            <p>Фото</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e)}
            />
          </div>
          <div>
            <p>Название</p>
            <input type="text" name="" id="" />
            <p>Описание</p>
            <input type="text" name="" id="" />
            <p>Вознаграждение</p>
            <input type="text" name="" id="" />
            <p>Опыт</p>
            <input type="text" name="" id="" />
          </div>
          <div>
            <p>Тип карты</p>
            <div>
              <label>
                <input
                  type="radio"
                  value="citizen"
                  checked={cardType === "citizen"}
                  onChange={(e) => setCardType(e.target.value)}
                />{" "}
                Житель
              </label>
              <label>
                <input
                  type="radio"
                  value="city"
                  checked={cardType === "city"}
                  onChange={(e) => setCardType(e.target.value)}
                />{" "}
                Город
              </label>
            </div>
          </div>
          <button className={styles.saveButton}>Сохранить</button>
        </div>
      </div>
    </div>
  );
};
export { routeAddEditCard };

export default AddEditCard;
