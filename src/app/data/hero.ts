import { Serializable } from "./serializable";

export class Hero extends Serializable {
  id?: string;
  name?: string;
  hp?: number;
  damage?: number;
  dexterity?: number;
  attack?: number;

  constructor() {
    super();
  }
}
