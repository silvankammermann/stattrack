import { Link } from "react-router-dom"
import { deleteGame, getGames } from "../storage/local";
import data from "../storage/db";
import { useState } from "react";
import Modal from "../components/Modal";

export default function Index() {

  const localGames = getGames();
  const storedGames = data;
  const [gameIdToDelete, setGameIdToDelete] = useState<string>("");

  return <main className="px-4 max-w-120 m-auto">
    <h1>TVM Stattrack</h1>

    <div className="flex justify-between align-middle">
      <h2>Meine Spiele</h2>
      <Link to="/new-game">
        <button className="bg-green-400 px-4 py-1 rounded-md">+</button>
      </Link>
    </div>

    {localGames.length ? localGames.map(game => <Link to={`/game/${game.id}`} key={game.id}>
      <div className="relative bg-blue-100 px-4 py-2 rounded-xl my-4">
        <h2>{game.opponent.name}</h2>
        <p>
          {game.homeGame ? "Heimspiel" : "Auswärtsspiel"} - {game.date}
        </p>
        <p>
          {game.homeGame ? `${game.score} - ${game.opponent.score}` : `${game.opponent.score} - ${game.score}`} {game.score - game.opponent.score < 0 ? "Niederlage" : "Sieg"}
        </p>
        <button
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
            setGameIdToDelete(game.id);
          }}
          className="absolute top-2 rounded-md right-2 bg-red-200 text-red-500 px-2"
        >x</button>
      </div>
    </Link>) : <p>Noch keine eigenen Spiele aufgezeichnet.</p>}

    <h2 className="mt-4">Spiele aus der Datenbank</h2>

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

    {gameIdToDelete && <Modal>
      <h2>Spiel löschen?</h2>
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => {
            deleteGame(gameIdToDelete);
            setGameIdToDelete("");
          }}
          className="flex-1 py-1 px-2 bg-green-400 text-center rounded-md"
        >Ja</button>
        <button
          onClick={() => setGameIdToDelete("")}
          className="flex-1 py-1 px-2 bg-red-400 text-center rounded-md"
        >Abbrechen</button>
      </div>
    </Modal>
    }
  </main >
}