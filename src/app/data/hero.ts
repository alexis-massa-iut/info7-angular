import { Serializable } from './serializable';

export class Hero extends Serializable {
  id?: string;
  name: string = 'Default name';
  hp: number = 10;
  damage: number = 10;
  dexterity: number = 10;
  attack: number = 10;

  constructor() {
    super();
  }
}
