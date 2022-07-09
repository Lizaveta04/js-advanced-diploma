import Character from '../Character';

export default class Daemon extends Character {
  constructor(level, type) {
    super(level, type = 'daemon');
    this.attack = 10;
    this.defence = 40;
    this.health = 100;
  }
}
