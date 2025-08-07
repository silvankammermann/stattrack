import { Link, useParams } from "react-router-dom";
import NotFound from "./404";
import data from "../storage/db";
import Flippable from "../components/Flippable";
import { MadeAndMissed } from "../model/types";

export default function GameResult() {
  const { id } = useParams();
  if (!id) return <NotFound />;
  const game = data.filter(g => g.id == id)[0];
  if (!game) return <NotFound />;

  const getRatioAsPercentage = (a: number, b: number): number => {
    if (a + b == 0) return 0;
    return Math.floor(a * 100 / (a + b));
  }

  const renderShots = (shots: MadeAndMissed[], labels: string[]): React.ReactNode => {
    return <div className="flex gap-2 my-2 justify-between">
      {shots.map((shot, i) => <Flippable
        key={i}
        className="flex-1 h-20 rounded-lg bg-cyan-200 text-cyan-700"
        front={<div className="flex flex-col">
          <p className="text-center text-3xl mt-2">{shot.made}</p>
          <p className="text-center opacity-50">{labels[i]}</p>
        </div>}
        back={<div className="flex flex-col">
          <p className="text-center">
            {`${getRatioAsPercentage(shot.made, shot.missed)}%`}
          </p>
          <p className="text-center">
            {shot.made} <span className="opacity-50">Treffer</span>
          </p>
          <p className="text-center">
            {shot.missed} <span className="opacity-50">Verfehlt</span>
          </p>
        </div>}
      />)}
    </div>;
  }

  const renderCountingStats = (stats: number[], labels: string[]): React.ReactNode => {
    return <div className="flex gap-2 mt-2 justify-between select-none">
      {stats.map((stat, i) =>
        <div key={i} className="flex flex-col rounded-lg flex-1 h-20 bg-cyan-200 text-cyan-700">
          <p className="text-center text-3xl mt-2">{stat}</p>
          <p className="text-center opacity-50">{labels[i]}</p>
        </div>
      )}
    </div>
  }

  return <>
    <Link to="/" className="ml-4">{"< zurück"}</Link>
    <div className="flex flex-col mx-auto max-w-100 gap-2">

      <div className={`p-3 rounded-[1rem] shadow-xl m-4 inline-block`}>
        <p className="text-2xl mr-2">Team</p>
        {renderShots([
          game.players.reduce((shots, player) => {
            return {
              made: shots.made + player.stats.twoPt.made,
              missed: shots.missed + player.stats.twoPt.missed
            }
          }, {
            made: 0,
            missed: 0
          }),
          game.players.reduce((shots, player) => {
            return {
              made: shots.made + player.stats.threePt.made,
              missed: shots.missed + player.stats.threePt.missed
            }
          }, {
            made: 0,
            missed: 0
          }),
          game.players.reduce((shots, player) => {
            return {
              made: shots.made + player.stats.ft.made,
              missed: shots.missed + player.stats.ft.missed
            }
          }, {
            made: 0,
            missed: 0
          })
        ], ["2er", "3er", "Freiwürfe"])}
        <Flippable
          className="flex-1 h-12 rounded-lg bg-cyan-200 text-cyan-700"
          //flipDirection="x"
          front={<div className="flex flex-col">
            <p className="text-center text-2xl mt-2">
              {game.players.reduce((reb, player) => reb + player.stats.reb.def + player.stats.reb.off, 0)}
              <span className="ml-2 opacity-50">Rebounds</span>
            </p>
          </div>}
          back={<div className="flex flex-col">
            <p className="text-center text-2xl mt-2">
              {game.players.reduce((reb, player) => reb + player.stats.reb.off, 0)}
              <span className="mx-2 opacity-50">Offensiv</span>
              {game.players.reduce((reb, player) => reb + player.stats.reb.def, 0)}
              <span className="ml-2 opacity-50">Defensiv</span>
            </p>
          </div>} />
        {renderCountingStats([
          game.players.reduce((ast, player) => ast + player.stats.ast, 0),
          game.players.reduce((ast, player) => ast + player.stats.stl, 0),
          game.players.reduce((ast, player) => ast + player.stats.blk, 0),
          game.players.reduce((ast, player) => ast + player.stats.to, 0)
        ], ["Assists", "Steals", "Blocks", "Turnover"])}
      </div>

      {game.players.map(p => <div
        key={p.nr}
        className={`p-3 rounded-[1rem] shadow-xl m-4 inline-block`}
      >
        <p>
          <span className="text-4xl mr-2">{p.nr}</span>
          <span>{p.name}</span>
        </p>
        {renderShots([
          p.stats.twoPt,
          p.stats.threePt,
          p.stats.ft
        ], ["2er", "3er", "Freiwürfe"])}
        <Flippable
          className="flex-1 h-12 rounded-lg bg-cyan-200 text-cyan-700"
          //flipDirection="x"
          front={<div className="flex flex-col">
            <p className="text-center text-2xl mt-2">
              {p.stats.reb.off + p.stats.reb.def}
              <span className="ml-2 opacity-50">Rebounds</span>
            </p>
          </div>}
          back={<div className="flex flex-col">
            <p className="text-center text-2xl mt-2">
              {p.stats.reb.off}
              <span className="mx-2 opacity-50">Offensiv</span>
              {p.stats.reb.def}
              <span className="ml-2 opacity-50">Defensiv</span>
            </p>
          </div>} />
        {renderCountingStats([
          p.stats.ast,
          p.stats.stl,
          p.stats.blk,
          p.stats.to
        ], ["Assists", "Steals", "Blocks", "Turnover"])}
      </div>)}
    </div>
  </>;
}