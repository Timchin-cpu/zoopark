import React from "react";
import styles from "./AddEditCard.module.css";
import routeAddEditCard from "./route";
const AddEditCard = () => {
  return (
    <div className={styles.contents}>
      <div className={styles.mainContent}>
        <div className={styles.content}>
          <p>Добавление/редактирование карт жители/город и наборов </p>
        </div>
      </div>
    </div>
  );
};
export { routeAddEditCard };

export default AddEditCard;
