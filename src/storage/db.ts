import { Game } from "../model/types";

const data: Game[] = [{
  id: "qwer",
  opponent: {
    name: "BC Gegner",
    score: 0
  },
  date: "3. Mai 2025",
  homeGame: false,
  players: [{
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
}];

export default data;