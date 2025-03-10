const initialState = {
  theme: true,
  cardBack: "default",
  energy: 100,
  lastEnergyUpdate: null,
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
    case "SET_ENERGY":
      return {
        ...state,
        energy: action.payload,
      };
    case "SET_LAST_ENERGY_UPDATE":
      return {
        ...state,
        lastEnergyUpdate: action.payload,
      };
    default:
      return state;
  }
};
export default rootReducer;
