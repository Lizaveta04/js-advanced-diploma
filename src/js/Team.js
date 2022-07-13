import Swordsman from './characters/Swordsman';
import Bowman from './characters/Bowman';
import Magician from './characters/Magician';
import Daemon from './characters/Daemon';
import Undead from './characters/Undead';
import Vampire from './characters/Vampire';

export default class Team {
  constructor() {
    this.userTeam = [Swordsman, Bowman, Magician];
    this.opponentTeam = [Daemon, Undead, Vampire];
  }
}
