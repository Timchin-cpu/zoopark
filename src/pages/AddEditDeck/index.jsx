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
const [cards, setCards] = useState([]);

useEffect(() => {
  const fetchCards = async () => {
    try {
      const response = await cardsService.getAllCards();
      setCards(response.data);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };
  fetchCards();
}, []);
// const handleAddCard = async (cardId) => {
//   try {
//     await cardSetsService.addCardToSet(id, cardId);
//     setSelectedCards([...selectedCards, cardId]);
//   } catch (error) {
//     console.error("Error adding card to set:", error);
//   }
// };
const handleAddCardToSet = async (cardId, setId) => {
  try {
    await cardSetsService.addCardToSet(setId, cardId);
  } catch (error) {
    console.error("Error adding card to set:", error);
  }
};
const AddEditDeck = () => {
  return (
    <div className={styles.contents}>
      <div className={styles.mainContent}>
        {cards.map((card) => (
          <div key={card.id} className={styles.cardItem}>
            <img src={`http://localhost:3000${card.image}`} alt={card.title} />
            <h3>{card.title}</h3>
            <button onClick={() => handleAddCardToSet(card.id, setId)}>
              Добавить в набор
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export { routeAddEditDeck };

export default AddEditDeck;
