import { Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import NewGame from "./pages/NewGame";
import GameOverview from "./pages/GameOverview";
import "./styles.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/new-game" element={<NewGame />} />
      <Route path="/game/:id" element={<GameOverview />} />
    </Routes>
  )
}
