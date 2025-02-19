import React, { useState } from "react";
import styles from "./AddEditCard.module.css";
import routeAddEditCard from "./route";
import { useParams } from "react-router-dom";
import axios from "../../axios-controller";
import { useHistory } from "react-router-dom";

const AddEditCard = () => {
  const history = useHistory();

  const [cardType, setCardType] = useState("citizen"); // or 'city'
  const [cardSection, setCardSection] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [experience, setExperience] = useState("");
  const [image, setImage] = useState(null);
  const { id } = useParams(); // Добавить импорт useParams из react-router-dom
  console.log(id);
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };
  console.log(selectedImage);
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("experience", experience);
    formData.append("type", cardSection);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      if (id) {
        // Обновление существующей карточки
        await axios.put(`/api/cards/${id}`, formData);
      } else {
        // Создание новой карточки
        await axios.post("/api/cards", formData);
      }
      // Редирект на страницу управления картами
      history.push("/cardmanagement");
    } catch (error) {
      console.error("Error:", error);
    }
  };
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
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />{" "}
            <p>Описание</p>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />{" "}
            <p>Вознаграждение</p>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />{" "}
            <p>Опыт</p>
            <input
              type="number"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />{" "}
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
                />
                Житель
              </label>
              <label>
                <input
                  type="radio"
                  value="city"
                  checked={cardType === "city"}
                  onChange={(e) => setCardType(e.target.value)}
                />
                Город
              </label>
            </div>

            {/* Add section select based on card type */}
            <div>
              <p>Раздел карты</p>
              <select
                value={cardSection}
                onChange={(e) => setCardSection(e.target.value)}
              >
                <option value="">Выберите раздел</option>
                {cardType === "citizen" ? (
                  <>
                    <option value="police">Полиция</option>
                    <option value="firefighter">Пожарные</option>
                  </>
                ) : (
                  <>
                    <option value="culture">Культурные объекты</option>
                    <option value="trade">Торговые объекты</option>
                  </>
                )}
              </select>
            </div>
          </div>
          <button className={styles.saveButton} onClick={handleSubmit}>
            Сохранить
          </button>{" "}
        </div>
      </div>
    </div>
  );
};
export { routeAddEditCard };

export default AddEditCard;
