import React from "react";
import styles from "./AddEditCard.module.css";
import routeAddEditCard from "./route";
import { useParams } from "react-router-dom";

const AddEditCard = () => {
  const { id } = useParams(); // Добавить импорт useParams из react-router-dom
  console.log(id);
  return (
    <div className={styles.contents}>
      <div className={styles.mainContent}>
        <div className={styles.content}>
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
        </div>
      </div>
    </div>
  );
};
export { routeAddEditCard };

export default AddEditCard;
