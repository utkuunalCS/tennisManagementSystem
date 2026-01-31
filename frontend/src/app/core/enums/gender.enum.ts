export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export function getGenderDisplay(gender: Gender): string {
  switch (gender) {
    case Gender.MALE:
      return 'Male';
    case Gender.FEMALE:
      return 'Female';
    default:
      return gender;
  }
}
