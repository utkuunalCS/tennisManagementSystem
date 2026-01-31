import { Gender } from '../enums/gender.enum';
import { SkillLevel } from '../enums/skill-level.enum';
import { Player } from './player.model';

export interface MatchSlot {
  matchNumber: number;
  position: number;
  requiredSkillLevel: SkillLevel;
  requiredGender: Gender;
  player?: Player;
}
