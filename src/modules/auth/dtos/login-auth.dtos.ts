export class LoginCredentialsAuthDTO {
  email: string;
  password: string;
}

export class LoginAuthDTO {
  accessToken: string;
  expiresIn: number | string;
  tokenType: string;
}
