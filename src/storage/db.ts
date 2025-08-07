import { Game } from "../model/types";

const data: Game[] = [{
  id: "qwer",
  opponent: {
    name: "BC Gegner",
    score: 0
  },
  date: "2. Mai 2025",
  homeGame: true,
  score: 20,
  players: [{
    nr: 4,
    name: "Dave",
    stats: {
      twoPt: {
        made: 3,
        missed: 7
      },
      threePt: {
        made: 2,
        missed: 2
      },
      ft: {
        made: 7,
        missed: 3
      },
      ast: 7,
      reb: {
        off: 0,
        def: 12
      },
      stl: 4,
      blk: 3,
      to: 2
    }
  },
  {
    nr: 5,
    name: "Jasper",
    stats: {
      twoPt: {
        made: 0,
        missed: 4
      },
      threePt: {
        made: 0,
        missed: 0
      },
      ft: {
        made: 2,
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
  },
  {
    nr: 6,
    name: "Edi",
    stats: {
      twoPt: {
        made: 4,
        missed: 4
      },
      threePt: {
        made: 0,
        missed: 1
      },
      ft: {
        made: 1,
        missed: 1
      },
      ast: 1,
      reb: {
        off: 0,
        def: 6
      },
      stl: 0,
      blk: 0,
      to: 3
    }
  },
  {
    nr: 8,
    name: "Jan",
    stats: {
      twoPt: {
        made: 0,
        missed: 0
      },
      threePt: {
        made: 0,
        missed: 4
      },
      ft: {
        made: 1,
        missed: 1
      },
      ast: 0,
      reb: {
        off: 0,
        def: 1
      },
      stl: 0,
      blk: 0,
      to: 2
    }
  },
  {
    nr: 9,
    name: "Nevio",
    stats: {
      twoPt: {
        made: 5,
        missed: 10
      },
      threePt: {
        made: 0,
        missed: 1
      },
      ft: {
        made: 1,
        missed: 1
      },
      ast: 3,
      reb: {
        off: 2,
        def: 8
      },
      stl: 1,
      blk: 0,
      to: 3
    }
  },
  {
    nr: 10,
    name: "Simon",
    stats: {
      twoPt: {
        made: 5,
        missed: 6
      },
      threePt: {
        made: 3,
        missed: 3
      },
      ft: {
        made: 0,
        missed: 0
      },
      ast: 0,
      reb: {
        off: 0,
        def: 5
      },
      stl: 1,
      blk: 1,
      to: 3
    }
  },
  {
    nr: 11,
    name: "Mischa",
    stats: {
      twoPt: {
        made: 4,
        missed: 5
      },
      threePt: {
        made: 0,
        missed: 1
      },
      ft: {
        made: 2,
        missed: 0
      },
      ast: 2,
      reb: {
        off: 1,
        def: 1
      },
      stl: 1,
      blk: 0,
      to: 2
    }
  },
  {
    nr: 12,
    name: "Stifu",
    stats: {
      twoPt: {
        made: 1,
        missed: 1
      },
      threePt: {
        made: 0,
        missed: 0
      },
      ft: {
        made: 2,
        missed: 0
      },
      ast: 0,
      reb: {
        off: 1,
        def: 1
      },
      stl: 0,
      blk: 0,
      to: 2
    }
  }]
}];

export default data;