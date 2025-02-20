import React from "react";
import styles from "./AddEditDeck.module.css";
import { useParams } from "react-router-dom";

// import routeAdmin from "./route";
// import { NavLink } from "react-router-dom";
// import { routeAddEditDeck } from "pages/AddEditDeck";
import routeAddEditDeck from "./route";
// const [selectedCards, setSelectedCards] = useState([]);
const { id } = useParams(); // Добавить импорт useParams из react-router-dom
console.log(id);
// const handleAddCard = async (cardId) => {
//   try {
//     await cardSetsService.addCardToSet(id, cardId);
//     setSelectedCards([...selectedCards, cardId]);
//   } catch (error) {
//     console.error("Error adding card to set:", error);
//   }
// };
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
