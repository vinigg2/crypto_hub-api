export enum GenderProfileDTO {
  MALE = 'M',
  FEMALE = 'F',
}

export class CreateProfileDTO {
  user: any;
  id?: string;
  birthday: Date;
  gender: GenderProfileDTO;
  phone: string;
  avatar?: string;
}
