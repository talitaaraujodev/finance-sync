import { Role } from '../aggregates/Role';

export class User {
  private _id: string | undefined;
  private _name: string;
  private _email: string;
  private _password: string;
  private _roles: Role[];

  constructor(
    name: string,
    email: string,
    password: string,
    roles: Role[],
    id?: string | undefined,
  ) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._password = password;
    this._roles = roles;
  }

  get id(): string {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  get email(): string {
    return this._email;
  }
  get password(): string {
    return this._password;
  }
  get roles(): Role[] {
    return this._roles;
  }
}
