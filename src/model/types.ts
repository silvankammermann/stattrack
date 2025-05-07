export type Game = {
  id: string;
  opponent: {
    name: string;
    score: number;
  };
  date: string;
  homeGame: boolean;
  players: Player[];
};

export type Player = {
  nr: number;
  name: string;
  stats: Stats;
};

export type Stats = {
  twoPt: MadeOrMissed;
  threePt: MadeOrMissed;
  ft: MadeOrMissed;
  ast: number;
  reb: Rebounds;
  stl: number;
  blk: number;
  to: number;
};

export type Rebounds = {
  off: number;
  def: number;
};

export type MadeOrMissed = {
  made: number;
  missed: number;
};