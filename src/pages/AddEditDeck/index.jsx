import React from "react";
import styles from "./AddEditDeck.module.css";
// import routeAdmin from "./route";
// import { NavLink } from "react-router-dom";
import { routeAddEditDeck } from "pages/AddEditDeck";
const AddEditDeck = () => {
  return (
    <div className={styles.contents}>
      <div className={styles.mainContent}>
        {/* <NavLink to={routeAddEditDeck()}>
          <div className={styles.content}>
            <p>Добавление/редактирование карт жители/город и наборов </p>
          </div>
        </NavLink> */}
      </div>
    </div>
  );
};
export { routeAddEditDeck };

export default AddEditDeck;
