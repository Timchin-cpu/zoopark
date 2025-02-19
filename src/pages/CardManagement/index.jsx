import React from "react";
import styles from "./CardManagement.module.css";
import routeCardManagement from "./route";
import { cardsService } from "services/api";

const CardManagement = () => {
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
  return (
    <div className={styles.contents}>
      <div className={styles.mainContent}>
        <h2>Карты жителей</h2>
        <div className={styles.cardsList}>
          {cards.map((card) => (
            <div key={card.id} className={styles.cardItem}>
              <img
                src={`http://localhost:3000${card.image}`}
                alt={card.title}
              />
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export { routeCardManagement };

export default CardManagement;
