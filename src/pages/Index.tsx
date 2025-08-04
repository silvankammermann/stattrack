import { Link } from "react-router-dom"
import { getGames } from "../storage/local";
import data from "../storage/db";

export default function Index() {

  const localGames = getGames();
  const storedGames = data;

  return <main className="px-4 max-w-120 m-auto">
    <h1>Spiele</h1>

    <div className="flex justify-between align-middle">
      <h2>Meine Spiele</h2>
      <Link to="/new-game">
        <button className="bg-green-400 px-4 py-1 rounded-md">+</button>
      </Link>
    </div>

    {localGames.map(game => <Link to={`/game/${game.id}`} key={game.id}>
      <div className="bg-blue-100 px-4 py-2 rounded-xl my-4">
        <h2>{game.opponent.name}</h2>
        <p>
          {game.homeGame ? "Heimspiel" : "Auswärtsspiel"} - {game.date}
        </p>
        <p>
          {game.homeGame ? `${game.score} - ${game.opponent.score}` : `${game.opponent.score} - ${game.score}`} {game.score - game.opponent.score < 0 ? "Niederlage" : "Sieg"}
        </p>
      </div>
    </Link>)}

    <h2>Spiele aus der Datenbank</h2>

    {storedGames.map(game => <Link to={`/result/${game.id}`} key={game.id}>
      <div className="bg-green-200 px-4 py-2 rounded-xl my-4">
        <h2>{game.opponent.name}</h2>
        <p>
          {game.homeGame ? "Heimspiel" : "Auswärtsspiel"} - {game.date}
        </p>
        <p>
          {game.homeGame ? `${game.score} - ${game.opponent.score}` : `${game.opponent.score} - ${game.score}`} {game.score - game.opponent.score < 0 ? "Niederlage" : "Sieg"}
        </p>
      </div>
    </Link>)}
  </main>
}