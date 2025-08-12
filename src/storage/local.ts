import { Game } from "../model/types"

const generateRandomId = () => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz1234567890"
  let id = "";
  for (let i = 0; i < 4; i++) {
    id += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  return id;
}

const getIds = (): string[] => {
  const ids = localStorage.getItem("ids");
  if (!ids) return [];
  return JSON.parse(ids);
}

const setIds = (modifier: (prev: string[]) => string[]): void => {
  const ids = localStorage.getItem("ids");
  let newList: string[] = [];
  if (!ids) {
    newList = modifier([]);
  } else {
    newList = modifier(JSON.parse(ids));
  }
  localStorage.setItem("ids", JSON.stringify(newList));
}

export const nextId = (): string => {
  let id = generateRandomId();
  while (getIds().includes(id)) id = generateRandomId();
  return id;
}

export const saveGame = (game: Game) => {
  localStorage.setItem(`game-${game.id}`, JSON.stringify(game));
  setIds(prev => {
    if (prev.includes(game.id)) return prev;
    return [...prev, game.id];
  });
}

export const getGames = (): Game[] => {
  const games: Game[] = [];
  getIds().forEach(id => {
    const g = getGame(id);
    g && games.push(g);
  });
  return games;
}

export const getGame = (id: string): Game | undefined => {
  const game = localStorage.getItem(`game-${id}`);
  if (!game) return undefined;
  return JSON.parse(game);
}

export const deleteGame = (id: string): void => {
  localStorage.removeItem(`game-${id}`);
  setIds(prev => prev.filter(i => i != id));
}