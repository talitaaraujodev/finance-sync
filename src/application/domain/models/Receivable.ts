export class Receivable {
  private _id: string | undefined;
  private _value: number;
  private _assignor: string;
  private _emissionDate: Date | string;

  constructor(
    value: number,
    assignor: string,
    emissionDate: Date | string,

    id?: string | undefined,
  ) {
    this._id = id;
    this._value = value;
    this._assignor = assignor;
    this._emissionDate = emissionDate;
  }

  get id(): string {
    return this._id;
  }
  get value(): number {
    return this._value;
  }
  get assignor(): string {
    return this._assignor;
  }
  get emissionDate(): Date | string {
    return this._emissionDate;
  }
}
