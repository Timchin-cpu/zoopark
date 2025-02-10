const initialState = "default";

export const cardBackReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CARD_BACK":
      return action.payload;
    default:
      return state;
  }
};
