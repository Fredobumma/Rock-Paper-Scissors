export const addScore = (name, score) =>
  localStorage.setItem(name, Number(score.innerText) + 1);
