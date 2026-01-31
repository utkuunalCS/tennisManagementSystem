export interface LineupPlayer {
  id?: number;
  playerId: number;
  firstName?: string;
  lastName?: string;
  matchNumber: number;
  position: number;
}

export interface Lineup {
  id?: number;
  name: string;
  lineupPlayers: LineupPlayer[];
  createdAt?: Date;
  updatedAt?: Date;
}
