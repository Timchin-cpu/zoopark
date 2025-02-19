import React from "react";
import styles from "./AdminPanel.module.css";
import routeAdmin from "./route";

const AdminPanel = () => {
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
export { routeAdmin };

export default AdminPanel;
