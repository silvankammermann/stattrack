import { Link } from "react-router-dom";

export default function NotFound() {
  return <>
    <h1>404</h1>
    <p>Diese Seite gibt es nicht.</p>
    <p>Zurück zur <Link to="/">Startseite</Link></p>
  </>
}