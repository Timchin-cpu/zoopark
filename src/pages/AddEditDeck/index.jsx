import React, { useState, useEffect } from "react";
import styles from "./AddEditDeck.module.css";
import { useParams } from "react-router-dom";
import { cardsService, cardSetsService } from "services/api";
import routeAddEditDeck from "./route";

const AddEditDeck = () => {
  const { id } = useParams();
  console.log(id);
  const [cards, setCards] = useState([]);
  const [existingCards, setExistingCards] = useState([]);

  useEffect(() => {
    const fetchExistingCards = async () => {
      if (id) {
        try {
          const response = await cardSetsService.getSetCards(id);
          setExistingCards(response.data);
        } catch (error) {
          console.error("Error fetching existing cards:", error);
        }
      }
    };
    fetchExistingCards();
  }, [id]);
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

  const handleAddCardToSet = async (cardId, setId) => {
    try {
      await cardSetsService.addCardToSet(setId, cardId);
    } catch (error) {
      console.error("Error adding card to set:", error);
    }
  };
  return (
    <div className={styles.contents}>
      <div className={styles.mainContent}>
        <h3>Карты в наборе:</h3>
        {existingCards.map((card) => (
          <div key={card.id} className={styles.cardItem}>
            <img src={`http://localhost:3000${card.image}`} alt={card.title} />
            <h3>{card.title}</h3>
          </div>
        ))}
      </div>
      <div className={styles.mainContent}>
        {cards.map((card) => (
          <div key={card.id} className={styles.cardItem}>
            <img src={`http://localhost:3000${card.image}`} alt={card.title} />
            <h3>{card.title}</h3>
            <button
              onClick={() => handleAddCardToSet(card.id, id)}
              disabled={existingCards.some((ec) => ec.id === card.id)}
            >
              {existingCards.some((ec) => ec.id === card.id)
                ? "В наборе"
                : "Добавить в набор"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export { routeAddEditDeck };

export default AddEditDeck;
