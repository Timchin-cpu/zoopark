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
  const [cardsInSet, setCardsInSet] = useState(new Set());

  // Обновляем при загрузке существующих карт
  useEffect(() => {
    setCardsInSet(new Set(existingCards.map((card) => card.id)));
  }, [existingCards]);
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
      // После успешного добавления обновляем список карт в наборе
      const response = await cardSetsService.getSetCards(id);
      setExistingCards(response.data);
    } catch (error) {
      console.error("Error adding card to set:", error);
    }
  };
  return (
    <div className={styles.contents}>
      <h3>Карты в наборе:</h3>
      <div className={styles.mainContent}>
        {existingCards.map((card) => (
          <div key={card.id} className={styles.cardItem}>
            <img src={`http://localhost:3000${card.image}`} alt={card.title} />
            <h3>{card.title}</h3>
          </div>
        ))}
      </div>
      <h3>Добавить карты в набор</h3>
      <div className={styles.mainContent}>
        {cards.map((card) => (
          <div key={card.id} className={styles.cardItem}>
            <img src={`http://localhost:3000${card.image}`} alt={card.title} />
            <h3>{card.title}</h3>
            <button
              onClick={() => handleAddCardToSet(card.id, id)}
              disabled={cardsInSet.has(card.id)}
            >
              {cardsInSet.has(card.id) ? "В наборе" : "Добавить в набор"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export { routeAddEditDeck };

export default AddEditDeck;
