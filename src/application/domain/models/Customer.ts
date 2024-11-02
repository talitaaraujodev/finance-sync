import { Address } from '../aggregates/Adress';

export class Customer {
  private _id: string | undefined;
  private _name: string;
  private _email: string;
  private _document: string;
  private _phone: string;
  private _address: Address;

  constructor(
    name: string,
    email: string,
    document: string,
    phone: string,
    address: Address,
    id?: string | undefined,
  ) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._document = document;
    this._phone = phone;
    this._address = address;
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
  get document(): string {
    return this._document;
  }
  get phone(): string {
    return this._phone;
  }
  get address(): Address {
    return this._address;
  }
}
