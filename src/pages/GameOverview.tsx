import { Link, useParams } from "react-router-dom";
import NotFound from "./404";
import { getGame } from "../storage/local";
import { useEffect, useState } from "react";
import { Game } from "../model/types";
import CountingStatButton from "../components/CountingStatButton";
import DoubleCountingStat from "../components/DoubleCountingStat";
import GameRepository from "../storage/GameRepository";

export default function GameOverview() {
  const { id } = useParams();
  if (!id) return <NotFound />;
  const g = getGame(id);
  if (!g) return <NotFound />;

  const [game, setGame] = useState<Game>(g);
  const [repo] = useState(() => GameRepository(game.id));
  const [correctingPlayers, setCorrectingPlayers] = useState<number[]>([]);

  useEffect(() => {
    repo.onChange(setGame);
  }, [repo]);

  return <>
    <Link to="/">Home</Link>
    <h1 className="text-center">{game.opponent.name} - {game.date}</h1>
    <div className="flex flex-wrap flex-row max-w-svw justify-center">
      {game.players.map(player =>
        <div
          key={player.nr}
          className={`w-100 p-3 ${correctingPlayers.includes(player.nr) ? "bg-red-50" : "bg-white"} rounded-[1rem] shadow-xl m-4 inline-block`}
        >
          <div className="flex justify-between mb-4">
            <p>
              <span className="text-4xl mr-2">{player.nr}</span>
              <span>{player.name}</span>
            </p>
            <div>
              <button
                onClick={() => {
                  repo.toggleInverted(player.nr)
                    ? setCorrectingPlayers(old => [...old, player.nr])
                    : setCorrectingPlayers(old => old.filter((nr) => nr != player.nr));
                }}
                className={`${correctingPlayers.includes(player.nr) ? "bg-green-300 text-green-500" : "bg-red-300 text-red-500"} rounded-sm px-2 py-1`}
              >
                {correctingPlayers.includes(player.nr) ? "fertig" : "korrigieren"}
              </button>
            </div>
          </div>
          <div className="flex gap-1">
            <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-1">
              <DoubleCountingStat
                label="2pt"
                numberLeft={player.stats.twoPt.made}
                numberRight={player.stats.twoPt.missed}
                onClickLeft={() => { repo.madeShot(player.nr, "twoPt"); }}
                onClickRight={() => { repo.missedShot(player.nr, "twoPt"); }}
              />
              <DoubleCountingStat
                label="Ft"
                numberLeft={player.stats.ft.made}
                numberRight={player.stats.ft.missed}
                onClickLeft={() => { repo.madeShot(player.nr, "ft"); }}
                onClickRight={() => { repo.missedShot(player.nr, "ft"); }}
              />
              <DoubleCountingStat
                label="3pt"
                numberLeft={player.stats.threePt.made}
                numberRight={player.stats.threePt.missed}
                onClickLeft={() => { repo.madeShot(player.nr, "threePt"); }}
                onClickRight={() => { repo.missedShot(player.nr, "threePt"); }}
              />
              <DoubleCountingStat
                label="Reb"
                numberLeft={player.stats.reb.def}
                numberRight={player.stats.reb.off}
                onClickLeft={() => { repo.rebound(player.nr, "def") }}
                onClickRight={() => { repo.rebound(player.nr, "off") }}
              />
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-1">
              <CountingStatButton onClick={() => { repo.countingStat(player.nr, "ast") }}>Ast {player.stats.ast}</CountingStatButton>
              <CountingStatButton onClick={() => { repo.countingStat(player.nr, "stl") }}>Stl {player.stats.stl}</CountingStatButton>
              <CountingStatButton onClick={() => { repo.countingStat(player.nr, "blk") }}>Blk {player.stats.blk}</CountingStatButton>
              <CountingStatButton onClick={() => { repo.countingStat(player.nr, "to") }}>To {player.stats.to}</CountingStatButton>
            </div>
          </div>
        </div>
      )}
    </div>
  </>
}