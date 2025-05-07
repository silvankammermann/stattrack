export default function Index() {

  const addGame = () => {
    // TODO
  }

  const exportAll = () => {
    // TODO
  }

  return <>
    <h1>Spiele</h1>
    <button onClick={addGame}>+</button>

    <div>
      <p>BC Bären</p>
      <p>Heimspiel - 2. Mai 2025</p>
      <p>75 - 84</p>
    </div>
    <footer>
      <button onClick={exportAll}>Alle exportieren</button>
    </footer>
  </>
}