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
  const [pendingChanges, setPendingChanges] = useState({
    addedCards: new Set(),
    removedCards: new Set(),
  });
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

  const handleAddCardToSet = (cardId) => {
    setPendingChanges((prev) => ({
      ...prev,
      addedCards: prev.addedCards.add(cardId),
    }));
    // Обновляем только локальное состояние
    setCardsInSet((prev) => new Set([...prev, cardId]));
  };

  const handleRemoveCardFromSet = (cardId) => {
    setPendingChanges((prev) => ({
      ...prev,
      removedCards: prev.removedCards.add(cardId),
    }));
    // Обновляем только локальное состояние
    setCardsInSet((prev) => {
      const newSet = new Set(prev);
      newSet.delete(cardId);
      return newSet;
    });
  };
  jsx;
  const handleSave = async () => {
    try {
      // Применяем все накопленные изменения
      for (const cardId of pendingChanges.addedCards) {
        await cardSetsService.addCardToSet(id, cardId);
      }
      for (const cardId of pendingChanges.removedCards) {
        await cardSetsService.removeCardFromSet(id, cardId);
      }

      // Обновляем состояние после успешного сохранения
      const response = await cardSetsService.getSetCards(id);
      setExistingCards(response.data);

      // Очищаем pending changes
      setPendingChanges({
        addedCards: new Set(),
        removedCards: new Set(),
      });
    } catch (error) {
      console.error("Error saving changes:", error);
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
            <button
              onClick={() => handleRemoveCardFromSet(card.id)}
              style={{ background: "red" }}
            >
              Удалить
            </button>
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
      <button onClick={handleSave} className={styles.saveButton}>
        Сохранить изменения
      </button>
    </div>
  );
};
export { routeAddEditDeck };

export default AddEditDeck;
