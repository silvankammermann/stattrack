import { Link } from "react-router-dom"
import { games } from "../data/games"

export default function Index() {

  const addGame = () => {
    // TODO
  }

  return <>
    <h1>Spiele</h1>
    <button onClick={addGame}>+</button>

    {games.map(game => <Link to={`/game/${game.id}`} key={game.id}>
      <div className="bg-blue-100 px-4 py-2 rounded-xl m-4">
        <h2>{game.opponent.name}</h2>
        <p>
          {game.homeGame ? "Heimspiel" : "Auswärtsspiel"} - {game.date}
        </p>
      </div>
    </Link>)}
  </>
}