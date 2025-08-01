import { Game } from "../model/types";

export const games: Game[] = [
  {
    id: "n23m",
    opponent: {
      name: "BC Bären",
      score: 84
    },
    date: "2. Mai 2025",
    homeGame: true,
    players: [
      {
        nr: 4,
        name: "Dave",
        stats: {
          twoPt: {
            made: 4,
            missed: 2
          },
          threePt: {
            made: 1,
            missed: 2
          },
          ft: {
            made: 5,
            missed: 1
          },
          ast: 2,
          reb: {
            off: 3,
            def: 1
          },
          stl: 1,
          blk: 0,
          to: 3
        }
      },
      {
        nr: 6,
        name: "Michi",
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
      }
    ]
  }
];