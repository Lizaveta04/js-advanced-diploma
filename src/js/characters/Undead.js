import Character from '../Character';

export default class Undead extends Character {
  constructor(level, type) {
    super(level, type = 'undead');
    this.attack = 40;
    this.defence = 10;
    this.health = 100;
  }
}
