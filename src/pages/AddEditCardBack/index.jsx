import React, { useState } from "react";
import styles from "./AddEditCardBack.module.css";
import routeAddEditCardBack from "./route";

const AddEditCardBack = () => {
  const [title, setTitle] = useState("");

  // const [image, setImage] = useState(null);

  return (
    <div className={styles.contents}>
      <div className={styles.mainContent}>
        <div className={styles.content}>
          <div>
            <p>Фото</p>
            <input type="file" accept="image/*" />
          </div>
          <div>
            <p>Название</p>
            <input type="text" value={title} />{" "}
          </div>
          <button className={styles.saveButton}>Сохранить</button>{" "}
        </div>
      </div>
    </div>
  );
};
export { routeAddEditCardBack };

export default AddEditCardBack;
