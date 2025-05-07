import { Link, useParams } from "react-router-dom";
import NotFound from "./404";
import { getGame } from "../util/persist";
import { useState } from "react";
import { Game } from "../model/types";

export default function GameOverview() {
  const { id } = useParams();
  if (!id) return <NotFound />;
  const g = getGame(id);
  if (!g) return <NotFound />;

  const [game, setGame] = useState<Game>(g);

  const updateShots = (nr: number, stat: "twoPt" | "threePt" | "ft", made: boolean) => {
    setGame(prev => ({
      ...prev,
      players: prev.players.map(p => {
        if (p.nr != nr) return p;
        else return {
          ...p,
          stats: {
            ...p.stats,
            [stat]: {
              made: p.stats[stat].made + (made ? 1 : 0),
              missed: p.stats[stat].missed + (made ? 0 : 1),
            }
          }
        }
      })
    }));
  }

  const updateNumericStat = (nr: number, stat: "ast" | "stl" | "blk" | "to") => {
    setGame(prev => ({
      ...prev,
      players: prev.players.map(p => {
        if (p.nr != nr) return p;
        else return {
          ...p,
          stats: {
            ...p.stats,
            [stat]: p.stats[stat] + 1
          }
        }
      })
    }));
  }

  const updateRebounds = (nr: number, off: boolean) => {
    setGame(prev => ({
      ...prev,
      players: prev.players.map(p => {
        if (p.nr != nr) return p;
        else return {
          ...p,
          stats: {
            ...p.stats,
            reb: {
              off: p.stats.reb.off + (off ? 1 : 0),
              def: p.stats.reb.def + (off ? 0 : 1),
            }
          }
        }
      })
    }));
  }

  return <>
    <Link to="/">Home</Link>
    <h1>{game.opponent.name}</h1>

    <div className="flex gap-1">
      <div className="border-2 border-solid border-black">
        2 PT
      </div>
      {game.players.map(player =>
        <div className="stat-player" key={`2pt-${player.nr}`}>
          <p>{player.nr} {player.name}</p>
          <button
            className="btn bg-green-300 w-8 h-8 px-1 py-0.5 border-s border-2 border-black"
            onClick={() => updateShots(player.nr, "twoPt", true)}>
            {player.stats.twoPt.made}</button>
          <button
            className="btn bg-red-300 w-8 h-8 px-1 py-0.5 border-s border-2 border-black"
            onClick={() => updateShots(player.nr, "twoPt", false)}>
            {player.stats.twoPt.missed}
          </button>
        </div>
      )}
    </div>
  </>
}