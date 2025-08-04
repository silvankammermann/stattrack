import { Game } from "../model/types";
import { getGame, saveGame } from "./local";

type ChangeListener = (newGame: Game) => void;

const GameRepository = (id: string) => {

  const game = getGame(id);
  const inverted: number[] = [];
  const changeListeners: ChangeListener[] = [];

  if (!game) throw Error(`Game with id ${id} does not exist locally.`);

  const _saveAndNotify = () => {
    console.log("saving");
    saveGame(game);
    changeListeners.forEach(listener => listener({ ...game }));
  }

  const onChange = (listener: ChangeListener) => {
    changeListeners.push(listener);
  }

  const toggleInverted = (playerNr: number): boolean => {
    if (inverted.includes(playerNr)) {
      inverted.splice(inverted.indexOf(playerNr), 1);
      return false;
    }
    inverted.push(playerNr);
    return true;
  }

  const madeShot = (player: number, shot: "twoPt" | "threePt" | "ft") => {
    const p = game.players.find(p => p.nr === player);
    if (!p) return;
    const delta = inverted.includes(player) ? -1 : 1;
    p.stats[shot].made = Math.max(0, p.stats[shot].made + delta);
    _saveAndNotify();
  }

  const missedShot = (player: number, shot: "twoPt" | "threePt" | "ft") => {
    const p = game.players.find(p => p.nr === player);
    if (!p) return;
    const delta = inverted.includes(player) ? -1 : 1;
    p.stats[shot].missed = Math.max(0, p.stats[shot].missed + delta);
    _saveAndNotify();
  }

  return {
    onChange,
    toggleInverted,
    madeShot,
    missedShot
  };
}

export default GameRepository;