import { Link, useParams } from "react-router-dom";
import NotFound from "./404";
import { getGame } from "../storage/local";
import { useState } from "react";
import { Game } from "../model/types";
import CountingStatButton from "../components/CountingStatButton";
import DoubleCountingStat from "../components/DoubleCountingStat";

export default function GameOverview() {
  const { id } = useParams();
  if (!id) return <NotFound />;
  const g = getGame(id);
  if (!g) return <NotFound />;

  const [game] = useState<Game>(g);

  return <>
    <Link to="/">Home</Link>
    <h1>{game.opponent.name}</h1>
    <div className="flex flex-wrap flex-row max-w-svw justify-center">
      {game.players.map(player =>
        <div
          key={player.nr}
          className="w-100 p-3 bg-white rounded-[1rem] shadow-xl m-4 inline-block"
        >
          <div className="flex justify-between mb-4">
            <p>
              <span className="text-4xl mr-2">{player.nr}</span>
              <span>{player.name}</span>
            </p>
            <div>
              <button className="bg-red-300 text-red-500 rounded-sm px-2 py-1">correct</button>
            </div>
          </div>
          <div className="flex gap-1">
            <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-1">
              <DoubleCountingStat label="2pt" numberLeft={player.stats.twoPt.made} numberRight={player.stats.twoPt.missed} />
              <DoubleCountingStat label="Ft" numberLeft={player.stats.ft.made} numberRight={player.stats.ft.missed} />
              <DoubleCountingStat label="3pt" numberLeft={player.stats.threePt.made} numberRight={player.stats.threePt.missed} />
              <DoubleCountingStat label="Reb" numberLeft={player.stats.reb.def} numberRight={player.stats.reb.off} />
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-1">
              <CountingStatButton onClick={() => { }}>Ast {player.stats.ast}</CountingStatButton>
              <CountingStatButton onClick={() => { }}>Stl {player.stats.stl}</CountingStatButton>
              <CountingStatButton onClick={() => { }}>Blk {player.stats.blk}</CountingStatButton>
              <CountingStatButton onClick={() => { }}>To {player.stats.to}</CountingStatButton>
            </div>
          </div>
        </div>
      )}
    </div>
  </>
}