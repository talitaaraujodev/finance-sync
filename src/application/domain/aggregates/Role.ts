export class Role {
  private _id: string | undefined;
  private _name: string;

  constructor(name: string, id?: string | undefined) {
    this._id = id;
    this._name = name;
  }

  get id(): string {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
}
