export enum SkillLevel {
  A_PLUS = 'A_PLUS',
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D'
}

export function getSkillLevelDisplay(level: SkillLevel): string {
  switch (level) {
    case SkillLevel.A_PLUS:
      return 'A+';
    case SkillLevel.A:
      return 'A';
    case SkillLevel.B:
      return 'B';
    case SkillLevel.C:
      return 'C';
    case SkillLevel.D:
      return 'D';
    default:
      return level;
  }
}
