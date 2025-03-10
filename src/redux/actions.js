export const setTheme = (theme) => ({
  type: "SET_THEME",
  payload: theme,
});
export const setCardBack = (style) => ({
  type: "SET_CARD_BACK",
  payload: style,
});
export const setEnergy = (energy) => ({
  type: "SET_ENERGY",
  payload: energy,
});
export const setLastEnergyUpdate = (timestamp) => ({
  type: "SET_LAST_ENERGY_UPDATE",
  payload: timestamp,
});
