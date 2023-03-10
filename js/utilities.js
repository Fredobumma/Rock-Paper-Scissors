const user = "user-score";
const comp = "comp-score";

export const addScore = (name, score) =>
  localStorage.setItem(name, Number(score.innerText) + 1);

export const computerChoice = (optionValues) =>
  optionValues[Math.floor(Math.random() * optionValues.length)];

export const setScores = (userValue, compValue) => {
  localStorage.setItem(user, userValue);
  localStorage.setItem(comp, compValue);
};

export const removeScores = () => {
  localStorage.removeItem(user);
  localStorage.removeItem(comp);
};

export const getUserScore = () => localStorage.getItem(user);

export const getComputerScore = () => localStorage.getItem(comp);
