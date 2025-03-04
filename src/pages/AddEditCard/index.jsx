import React, { useState, useEffect } from "react";
import styles from "./AddEditCard.module.css";
import routeAddEditCard from "./route";
import { cardsService } from "services/api";
import { useParams } from "react-router-dom";
import axios from "../../axios-controller";
import { useHistory } from "react-router-dom";
import addimg from "assets/img/addimg.png";

const AddEditCard = () => {
  const history = useHistory();
  const [chance, setChance] = useState("100");
  const [cardType, setCardType] = useState("citizen"); // or 'city'
  const [cardSection, setCardSection] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [experience, setExperience] = useState("");
  // const [image, setImage] = useState(null);
  const { id } = useParams(); // Добавить импорт useParams из react-router-dom
  console.log(id);
  useEffect(() => {
    const fetchCardData = async () => {
      if (id) {
        try {
          const response = await cardsService.getCard(id);
          const card = response.data;
          console.log(card);
          console.log(response);
          // Устанавливаем все поля формы из полученных данных
          setTitle(card.title || "");
          setDescription(card.description || "");
          setChance(card.chance || "100");
          setPrice(card.price || "");
          setExperience(card.experience || "");
          setCardType(card.type || "citizen");
          setCardSection(card.section || "");
        } catch (error) {
          console.error("Error fetching card:", error);
        }
      }
    };
    fetchCardData();
  }, [id]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };
  console.log(selectedImage);
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("chance", chance);

    formData.append("price", price);
    formData.append("experience", experience);
    formData.append("type", cardSection);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      if (id) {
        // Обновление существующей карточки
        await axios.put(`/cards/${id}`, formData);
      } else {
        // Создание новой карточки
        await axios.post("/cards", formData);
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
            {imagePreview ? (
              <div className={styles.imagePreview}>
                <div
                  onClick={() => document.getElementById("fileInput").click()}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{ maxWidth: "200px" }}
                  />
                </div>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
              </div>
            ) : (
              <div className={styles.uploadButton}>
                <label htmlFor="fileInput" className={styles.customFileButton}>
                  <div className={styles.whiteBox}>
                    <div className={styles.whiteBoxImg}>
                      <img src={addimg} alt="#" />
                      <p>Добавьте изображене</p>
                    </div>
                  </div>
                </label>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
              </div>
            )}
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
            <p>Шанс выпадения (%)</p>
            <input
              type="number"
              min="0"
              max="100"
              value={chance}
              onChange={(e) => setChance(e.target.value)}
            />
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
