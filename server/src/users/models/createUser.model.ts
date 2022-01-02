export class UserModel {
  name: string;
  password: string;
  login: string;
  readonly permission: number;
  readonly isBanned: boolean;
  readonly isOnline: boolean;
}
