import { Serializable } from './serializable';

export class Weapon extends Serializable {
  id?: string;
  name: string = 'Default name';
  hp: number = 0;
  damage: number = 0;
  dexterity: number = 0;
  attack: number = 0;

  constructor() {
    super();
  }
}
