import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducer";
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
