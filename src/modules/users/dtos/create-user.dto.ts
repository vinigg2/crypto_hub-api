export enum UserStatus {
  ACTIVE = 'A',
  DISABLE = 'D',
}
export class CreateUserDTO {
  name: string;
  id?: string;
  email: string;
  password: string;
  status: UserStatus;
}
