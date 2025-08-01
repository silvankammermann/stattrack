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

  const [game] = useState<Game>(g);

  return <>
    <Link to="/">Home</Link>
    <h1>{game.opponent.name}</h1>
    {game.players.map(player =>
      <div
        key={player.nr}
        className="w-100 p-3 bg-white rounded-[1rem] shadow-xl m-4 inline-block"
      >
        <div className="flex justify-between mb-4">
          <p>
            <span className="text-4xl">{player.nr}</span>
            <span>{player.name}</span>
          </p>
          <div className="">
            <button className="bg-red-300 text-red-500 rounded-sm px-2 py-1">correct</button>
          </div>
        </div>
        <div className="flex gap-1">
          <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-1">
            <div className="flex rounded-sm bg-blue-100">
              <p className="flex-1 text-center py-0.5">2pt</p>
              <p className="bg-green-300 rounded-l-sm text-center w-9 py-0.5">{player.stats.twoPt.made}</p>
              <p className="bg-red-300 rounded-r-sm text-center w-9 py-0.5">{player.stats.twoPt.missed}</p>
            </div>
            <div className="flex rounded-sm bg-blue-100">
              <p className="flex-1 text-center py-0.5">Ft</p>
              <p className="bg-green-300 rounded-l-sm text-center w-9 py-0.5">{player.stats.ft.made}</p>
              <p className="bg-red-300 rounded-r-sm text-center w-9 py-0.5">{player.stats.ft.missed}</p>
            </div>
            <div className="flex rounded-sm bg-blue-100">
              <p className="flex-1 text-center py-0.5">3pt</p>
              <p className="bg-green-300 rounded-l-sm text-center w-9 py-0.5">{player.stats.threePt.made}</p>
              <p className="bg-red-300 rounded-r-sm text-center w-9 py-0.5">{player.stats.threePt.missed}</p>
            </div>
            <div className="flex rounded-sm bg-blue-100">
              <p className="flex-1 text-center py-0.5">Reb</p>
              <p className="bg-green-300 rounded-l-sm text-center w-9 py-0.5">{player.stats.reb.def}</p>
              <p className="bg-red-300 rounded-r-sm text-center w-9 py-0.5">{player.stats.reb.off}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-1">
            <button className="bg-orange-200 rounded-sm text-center w-16 py-0.5">Ast {player.stats.ast}</button>
            <button className="bg-orange-200 rounded-sm text-center w-16 py-0.5">Stl {player.stats.stl}</button>
            <button className="bg-orange-200 rounded-sm text-center w-16 py-0.5">Blk {player.stats.blk}</button>
            <button className="bg-orange-200 rounded-sm text-center w-16 py-0.5">To {player.stats.to}</button>
          </div>
        </div>
      </div>
    )}
  </>
}