import { Link } from "react-router-dom"
import { getGames } from "../storage/local";
import data from "../storage/db";

export default function Index() {

  const localGames = getGames();
  const storedGames = data;

  const addGame = () => {
    // TODO
  }

  return <main className="px-4">
    <h1>Spiele</h1>

    <div className="flex justify-between align-middle">
      <h2>Meine Spiele</h2>
      <div>
        <button
          className="bg-green-400 px-4 py-1 rounded-md"
          onClick={addGame}
        >+</button>
      </div>
    </div>

    {localGames.map(game => <Link to={`/game/${game.id}`} key={game.id}>
      <div className="bg-blue-100 px-4 py-2 rounded-xl my-4">
        <h2>{game.opponent.name}</h2>
        <p>
          {game.homeGame ? "Heimspiel" : "Auswärtsspiel"} - {game.date}
        </p>
      </div>
    </Link>)}

    <h2>Spiele aus der Datenbank</h2>

    {storedGames.map(game => <Link to={`/game/${game.id}`} key={game.id}>
      <div className="bg-green-200 px-4 py-2 rounded-xl my-4">
        <h2>{game.opponent.name}</h2>
        <p>
          {game.homeGame ? "Heimspiel" : "Auswärtsspiel"} - {game.date}
        </p>
      </div>
    </Link>)}
  </main>
}