import { Gender } from '../enums/gender.enum';
import { SkillLevel } from '../enums/skill-level.enum';

export interface Player {
  id: number;
  firstName: string;
  lastName: string;
  skillLevel: SkillLevel;
  gender: Gender;
  matchesPlayed: number;
  matchesWon: number;
  matchesLost: number;
  winPercentage?: number;
}
