import { useState } from "react";
import { Game } from "../model/types";
import Toggle from "../components/Toggle";
import { nextId, saveGame } from "../storage/local";
import { useNavigate } from "react-router-dom";

export default function NewGame() {

  const nav = useNavigate();

  const [gameForm, setGameForm] = useState<Game>({
    id: nextId(),
    homeGame: true,
    date: new Date().toISOString().split('T')[0],
    score: 0,
    opponent: {
      name: "",
      score: 0,
    },
    players: []
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveGame(gameForm);
    nav(`/game/${gameForm.id}`)
  }

  const setHomeGame = (val: boolean) => {
    setGameForm(prev => ({
      ...prev,
      homeGame: val
    }));
  }

  const setDate = (val: string) => {
    setGameForm(prev => ({
      ...prev,
      date: val
    }));
  }

  const setOpponent = (val: string) => {
    setGameForm(prev => ({
      ...prev,
      opponent: {
        ...prev.opponent,
        name: val
      }
    }));
  }

  const addPlayer = () => {
    setGameForm(prev => ({
      ...prev,
      players: [...prev.players, {
        nr: 0,
        name: "",
        stats: {
          twoPt: {
            made: 0,
            missed: 0
          },
          threePt: {
            made: 0,
            missed: 0
          },
          ft: {
            made: 0,
            missed: 0
          },
          ast: 0,
          reb: {
            off: 0,
            def: 0
          },
          stl: 0,
          blk: 0,
          to: 0
        }
      }]
    }));
  }

  const setPlayerNumber = (index: number, nr: number) => {
    setGameForm(prev => ({
      ...prev,
      players: prev.players.map((p, i) =>
        i == index
          ? { ...p, nr: nr }
          : p
      )
    }))
  }

  const setPlayerName = (index: number, name: string) => {
    setGameForm(prev => ({
      ...prev,
      players: prev.players.map((p, i) =>
        i == index
          ? { ...p, name: name }
          : p
      )
    }))
  }

  const removePlayer = (index: number) => {
    setGameForm(prev => ({
      ...prev,
      players: prev.players.filter((_, i) => i != index)
    }));
  }

  return <main className="mx-4">
    <h1>Neues Spiel</h1>
    <form onSubmit={onSubmit}>
      <Toggle
        options={["Heimspiel", "Auswärtsspiel"]}
        onToggle={(newVal) => {
          setHomeGame(newVal == "Heimspiel");
        }} />
      <label htmlFor="opponent">Gegner</label><br />
      <input
        className="w-full bg-gray-200 px-4 py-2 rounded-lg"
        type="text"
        name="opponent"
        id="opponent"
        value={gameForm.opponent.name} onChange={(e) => setOpponent(e.target.value)}
        required />
      <br />
      <label htmlFor="date">Datum</label><br />
      <input className="bg-gray-200 rounded-lg px-4 py-2" type="date" name="date" id="date" value={gameForm.date} onChange={(e) => setDate(e.target.value)} required />
      <br />
      <label>Spieler</label>
      {gameForm.players.map((player, index) => <div key={index} className="flex my-1">
        <input
          className="rounded-l-lg pl-2 bg-gray-200 border-r w-14 [appearance:textfield]"
          placeholder="Nr."
          type="number"
          value={player.nr || ""}
          onChange={(e) => setPlayerNumber(index, Number(e.target.value))}
          required />
        <input
          className="flex-1 pl-2 bg-gray-200"
          placeholder="Name"
          type="text"
          value={player.name}
          onChange={(e) => setPlayerName(index, e.target.value)}
          required />
        <button
          className="bg-red-300 rounded-r-lg py-1 px-4"
          onClick={(e) => {
            e.preventDefault();
            removePlayer(index);
          }}>del.</button>
      </div>)}


      <button
        className="block bg-green-200 text-green-700 py-1 px-4 mb-4 rounded-lg"
        onClick={(e) => {
          e.preventDefault();
          addPlayer();
        }}
      >Spieler hinzufügen</button>
      <button
        className="block bg-blue-200 rounded-lg text-cyan-900 py-1 px-4"
        type="submit">Spiel erstellen</button>
    </form>
  </main>
}