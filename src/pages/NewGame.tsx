import { useState } from "react";
import { Game, Player } from "../model/types";
import Toggle from "../components/Toggle";
import { nextId, saveGame } from "../storage/local";
import { Navigate, useNavigate } from "react-router-dom";

export default function NewGame() {
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
    useNavigate()(`/game/${gameForm.id}`)
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

  return <>
    <h1>Neues Spiel</h1>
    <form onSubmit={onSubmit}>
      <Toggle
        options={["Heimspiel", "Auswärtsspiel"]}
        onToggle={(newVal) => {
          setHomeGame(newVal == "Heimspiel");
        }} />
      <label htmlFor="opponent">Gegner</label>
      <input type="text" name="opponent" id="opponent" value={gameForm.opponent.name} onChange={(e) => setOpponent(e.target.value)} required />

      <label htmlFor="date">Datum</label>
      <input type="date" name="date" id="date" value={gameForm.date} onChange={(e) => setDate(e.target.value)} required />

      <label>Spieler</label>
      {gameForm.players.map((player, index) => <div key={index}>
        <input type="number" value={player.nr || ""} onChange={(e) => setPlayerNumber(index, Number(e.target.value))} />
        <input type="text" value={player.name} onChange={(e) => setPlayerName(index, e.target.value)} />
        <button onClick={(e) => {
          e.preventDefault();
          removePlayer(index);
        }}>del.</button>

      </div>)}
      <button
        onClick={(e) => {
          e.preventDefault();
          addPlayer();
        }}
      >+</button>
      <button type="submit">Spiel erstellen</button>
    </form>
  </>
}