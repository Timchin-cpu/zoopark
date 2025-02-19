import React from "react";
import styles from "./CardManagement.module.css";
import routeCardManagement from "./route";

const CardManagement = () => {
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
export { routeCardManagement };

export default CardManagement;
