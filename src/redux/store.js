import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducer";
const initialState = {
  theme: true,
  cardBack: "default", // Добавить начальное состояние для cardBack
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_THEME":
      return {
        ...state,
        theme: action.payload,
      };
    case "SET_CARD_BACK":
      return {
        ...state,
        cardBack: action.payload,
      };
    default:
      return state;
  }
};
// import { combineReducers } from "redux";
// import { cardBackReducer } from "./reducers/cardBackReducer";

// const rootReducer = combineReducers({
//   theme: themeReducer,
//   cardBack: cardBackReducer,
// });
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
