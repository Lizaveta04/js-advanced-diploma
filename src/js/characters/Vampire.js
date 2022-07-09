import Character from '../Character';

export default class Vampire extends Character {
  constructor(level, type) {
    super(level, type = 'vampire');
    this.attack = 25;
    this.defence = 25;
    this.health = 100;
  }
}
