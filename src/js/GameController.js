import themes from './themes';
import { generateTeam } from './generators';
import PositionedCharacter from './PositionedCharacter';
import cursors from './cursors';

import Swordsman from './characters/Swordsman';
import Bowman from './characters/Bowman';
import Magician from './characters/Magician';
import Daemon from './characters/Daemon';
import Undead from './characters/Undead';
import Vampire from './characters/Vampire';


export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
  }

  init() {
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
    this.gamePlay.drawUi(themes.prairie);
    this.gamePlay.redrawPositions(this.positioningOfCharacters());
    this.gamePlay.addCellEnterListener(this.onCellEnter);
    this.gamePlay.addCellLeaveListener(this.onCellLeave);
    this.gamePlay.addCellClickListener(this.onCellClick);
  }

  createUserTeam() {
    const allowedTypes = [Bowman, Magician, Swordsman];
    const userTeam = generateTeam(allowedTypes, 4, 3);
    return userTeam;
  }
  
  createUserCharacter() {
    const allowedTypes = [Bowman, Magician, Swordsman];
    const randomType = Math.floor(Math.random() * allowedTypes.length);
    const userCharacter = new allowedTypes[randomType];
    return userCharacter;
  }

  createUserPosition() {
    const userIndex = [0, 1, 8, 9, 16, 17, 24, 25, 32, 33, 40, 41, 48, 49, 56, 57];
    const randomUserIndex = Math.floor(Math.random() * userIndex.length);
    return userIndex[randomUserIndex];
  }

  createOpponentTeam() {
    const allowedTypes = [Daemon, Undead, Vampire];
    const opponentTeam = generateTeam(allowedTypes, 4, 3);
    return opponentTeam;
  }

  createOpponentCharacter() {
    const allowedTypes = [Daemon, Undead, Vampire];
    const randomType = Math.floor(Math.random() * allowedTypes.length);
    const opponentCharacter = new allowedTypes[randomType];
    return opponentCharacter;
  }

  createOpponentPosition() {
    const opponentIndex = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63];
    const randomOpponentIndex = Math.floor(Math.random() * opponentIndex.length);
    return opponentIndex[randomOpponentIndex];
  }

  positioningOfCharacters() {
    const user = new PositionedCharacter(this.createUserCharacter(), this.createUserPosition());
    const opponent = new PositionedCharacter(this.createOpponentCharacter(), this.createOpponentPosition());
    return [user, opponent];
  }

  onCellClick(index) {
    // TODO: react to click
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
    this.gamePlay.setCursor(cursors.pointer);
    const message = `${'icon'}${this.createUserCharacter().level}${'icon'}${this.createUserCharacter().attack}${'icon'}${this.createUserCharacter().defence}${'icon'}${this.createUserCharacter().health}`;
    this.gamePlay.showCellTooltip(message, index);
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
    this.gamePlay.hideCellTooltip(index);
  }
}
