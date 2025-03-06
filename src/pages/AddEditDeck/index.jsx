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
  const [cardReward, setCardReward] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [currentAvailableIndex, setCurrentAvailableIndex] = useState(0);

  const [cards, setCards] = useState([]);
  const [existingCards, setExistingCards] = useState([]);
  const [cardsInSet, setCardsInSet] = useState(new Set());
  const [showAddCards, setShowAddCards] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
  const handleCardRewardChange = async (e) => {
    const value = e.target.value;
    setCardReward(value);

    if (value.length > 0) {
      // Фильтруем карты по введенному значению
      const filteredCards = cards.filter((card) =>
        card.title.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredCards);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };
  const handleSuggestionClick = (card) => {
    setCardReward(card.title);
    setSuggestions([]);
    setShowSuggestions(false);
  };
  return (
    <div className={styles.contents}>
      <div className={styles.content}>
        <div>
          {" "}
          <h3>Карты в наборе:</h3>
          <div className={styles.mainContent}>
            <img
              src={left}
              className={styles.arrow}
              onClick={() => {
                // const filteredCards = cards.filter((card) =>
                //   cardsInSet.has(card.id)
                // );
                currentSetIndex > 0 && setCurrentSetIndex(currentSetIndex - 1);
              }}
              alt="Previous"
            />
            {cards
              .filter((card) => cardsInSet.has(card.id))
              .slice(currentSetIndex, currentSetIndex + 3)
              .map((card) => (
                <div key={card.id} className={styles.cardItem}>
                  <div className={styles.cardItemImg}>
                    <img
                      src={`http://localhost:3000${card.image}`}
                      alt={card.title}
                    />
                  </div>
                  <div className={styles.cardInfo}>
                    <h3>{card.title}</h3>
                  </div>
                  <button
                    onClick={() => handleRemoveCardFromSet(card.id)}
                    style={{ background: "red" }}
                  >
                    Удалить
                  </button>
                </div>
              ))}

            <div
              className={styles.whiteBox}
              onClick={() => setShowAddCards(!showAddCards)}
            >
              <div className={styles.whiteBoxImg}>
                <img src={addimg} alt="#" style={{ height: "64px" }} />
                <p
                  style={{
                    wordBreak: "break-word",
                    whiteSpace: "normal",
                    hyphens: "auto",
                  }}
                >
                  Добавьте изображение
                </p>
              </div>
            </div>
            <img
              src={right}
              className={styles.arrow}
              onClick={() => {
                const filteredCards = cards.filter((card) =>
                  cardsInSet.has(card.id)
                );
                currentSetIndex < filteredCards.length - 3 &&
                  setCurrentSetIndex(currentSetIndex + 1);
              }}
              alt="Next"
            />
          </div>
          {showAddCards && (
            <div>
              <h3>Добавить карты в набор</h3>
              <div className={styles.mainContent}>
                <img
                  src={left}
                  className={styles.arrow}
                  onClick={() => {
                    // const filteredCards = cards.filter(
                    //   (card) => !cardsInSet.has(card.id)
                    // );
                    currentAvailableIndex > 0 &&
                      setCurrentAvailableIndex(currentAvailableIndex - 1);
                  }}
                  alt="Previous"
                />
                {cards
                  .filter(
                    (card) =>
                      !cardsInSet.has(card.id) &&
                      card.title
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                  )
                  .slice(currentAvailableIndex, currentAvailableIndex + 3)
                  .map((card) => (
                    <div key={card.id} className={styles.cardItem}>
                      <div className={styles.cardItemImg}>
                        <img
                          src={`http://localhost:3000${card.image}`}
                          alt={card.title}
                        />
                      </div>
                      <div className={styles.cardInfo}>
                        <h3>{card.title}</h3>
                      </div>
                      <button
                        onClick={() => handleAddCardToSet(card.id)}
                        disabled={cardsInSet.has(card.id)}
                      >
                        {cardsInSet.has(card.id)
                          ? "В наборе"
                          : "Добавить в набор"}
                      </button>
                    </div>
                  ))}
                <img
                  src={right}
                  className={styles.arrow}
                  onClick={() => {
                    const filteredCards = cards.filter(
                      (card) => !cardsInSet.has(card.id)
                    );
                    currentAvailableIndex < filteredCards.length - 3 &&
                      setCurrentAvailableIndex(currentAvailableIndex + 1);
                  }}
                  alt="Next"
                />
              </div>
              <div className={styles.searchContainer}>
                <input
                  type="text"
                  placeholder="Поиск по названию"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
            </div>
          )}
        </div>
        <div className={styles.inputContainer}>
          <div style={{ marginRight: "10px" }}>
            <h2 className={styles.title}>Название</h2>

            <input type="text" />
            <h2 className={styles.title}>Описание</h2>
            <textarea
              className={styles.describedCard}
              placeholder="Введите описание"
            />
            <h2 className={styles.title}>Вознаграждение </h2>
            <input type="text" />
          </div>
          <div style={{ marginRight: "10px" }}>
            {" "}
            <h2 className={styles.title}>Опыт</h2>
            <input type="text" />
            <h2 className={styles.title}>Вознаграждение в час</h2>
            <input type="text" />
            <h2 className={styles.title}>Вознаграждение картой</h2>
            <div className={styles.autocompleteContainer}>
              <input
                type="text"
                value={cardReward}
                onChange={handleCardRewardChange}
                placeholder="Введите название карты"
              />
              {showSuggestions && suggestions.length > 0 && (
                <div className={styles.suggestionsList}>
                  {suggestions.map((card) => (
                    <div
                      key={card.id}
                      className={styles.suggestionItem}
                      onClick={() => handleSuggestionClick(card)}
                    >
                      {card.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className={styles.save}>
              <button onClick={handleSave} className={styles.saveButton}>
                Сохранить изменения
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export { routeAddEditDeck };

export default AddEditDeck;
