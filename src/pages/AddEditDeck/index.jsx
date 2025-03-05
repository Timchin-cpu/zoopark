import React, { useState, useEffect } from "react";
import styles from "./AddEditDeck.module.css";
import { useParams } from "react-router-dom";
import { cardsService, cardSetsService } from "services/api";
import routeAddEditDeck from "./route";
import addimg from "assets/img/addimg.png";
import left from "assets/img/left.png";
import right from "assets/img/right.png";

const AddEditDeck = () => {
  const { id } = useParams();
  console.log(id);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [cards, setCards] = useState([]);
  const [existingCards, setExistingCards] = useState([]);
  const [cardsInSet, setCardsInSet] = useState(new Set());
  const [showAddCards, setShowAddCards] = useState(false);

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

    // Добавляем карточку также в existingCards
    // const cardToAdd = cards.find((card) => card.id === cardId);
    // if (cardToAdd) {
    //   setExistingCards((prev) => [...prev, cardToAdd]);
    // }

    setCardsInSet((prev) => new Set([...prev, cardId]));
  };

  const handleRemoveCardFromSet = (cardId) => {
    // Скрываем карточку визуально
    setCardsInSet((prev) => {
      const newSet = new Set(prev);
      newSet.delete(cardId);
      return newSet;
    });

    // Добавляем в список ожидающих удаления
    setPendingChanges((prev) => ({
      ...prev,
      removedCards: prev.removedCards.add(cardId),
    }));
  };
  const handleSave = async () => {
    try {
      // Удаление карт
      for (const cardId of pendingChanges.removedCards) {
        await cardSetsService.removeCardFromSet(id, cardId);
      }

      // Добавление новых карт
      for (const cardId of pendingChanges.addedCards) {
        await cardSetsService.addCardToSet(id, cardId);
      }

      const response = await cardSetsService.getSetCards(id);
      setExistingCards(response.data);
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
      <div className={styles.content}>
        <h3>Карты в наборе:</h3>
        <div className={styles.mainContent}>
          <img
            src={left}
            className={styles.navArrow}
            onClick={() =>
              currentIndex > 0 && setCurrentIndex(currentIndex - 1)
            }
            alt="Previous"
          />
          {cards.slice(currentIndex, currentIndex + 3).map(
            (card) =>
              cardsInSet.has(card.id) && (
                <div key={card.id} className={styles.cardItem}>
                  <div className={styles.cardItemImg}>
                    <img
                      src={`http://localhost:3000${card.image}`}
                      alt={card.title}
                    />{" "}
                  </div>
                  <div className={styles.cardInfo}>
                    <h3>{card.title}</h3>{" "}
                  </div>

                  <button
                    onClick={() => handleRemoveCardFromSet(card.id)}
                    style={{ background: "red" }}
                  >
                    Удалить
                  </button>
                </div>
              )
          )}{" "}
          <img
            src={right}
            className={styles.navArrow}
            onClick={() =>
              currentIndex < cards.length - 3 &&
              setCurrentIndex(currentIndex + 1)
            }
            alt="Next"
          />
          <div
            className={styles.whiteBox}
            onClick={() => setShowAddCards(!showAddCards)}
          >
            <div className={styles.whiteBoxImg}>
              <img src={addimg} alt="#" style={{ height: "64px" }} />
              <p>Добавьте изображене</p>
            </div>
          </div>
        </div>
        {showAddCards && (
          <div>
            <h3>Добавить карты в набор</h3>
            <div className={styles.mainContent}>
              {cards.map((card) => (
                <div key={card.id} className={styles.cardItem}>
                  {" "}
                  <div className={styles.cardItemImg}>
                    <img
                      src={`http://localhost:3000${card.image}`}
                      alt={card.title}
                    />{" "}
                  </div>
                  <div className={styles.cardInfo}>
                    <h3>{card.title}</h3>{" "}
                  </div>
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
        )}
        <div className={styles.save}>
          <button onClick={handleSave} className={styles.saveButton}>
            Сохранить изменения
          </button>
        </div>
      </div>
    </div>
  );
};
export { routeAddEditDeck };

export default AddEditDeck;
