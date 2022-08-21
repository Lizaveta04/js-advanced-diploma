import themes from './themes';
import { generateTeam } from './generators';
import PositionedCharacter from './PositionedCharacter';
import cursors from './cursors';
import GamePlay from './GamePlay';

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
    this.position = [];
    this.userTypes = [Bowman, Magician, Swordsman];
    this.opponentTypes = [Daemon, Undead, Vampire];
    this.userIndex = [0, 1, 8, 9, 16, 17, 24, 25, 32, 33, 40, 41, 48, 49, 56, 57];
    this.opponentIndex = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63];
  }

  init() {
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
    this.gamePlay.drawUi(themes.prairie);
    this.gamePlay.redrawPositions(this.generateRandomCharacter(this.userIndex, this.userTypes));
    this.gamePlay.redrawPositions(this.generateRandomCharacter(this.opponentIndex, this.opponentTypes));
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
  }

  // createUserTeam() {
  //   const allowedTypes = [Bowman, Magician, Swordsman];
  //   const userTeam = generateTeam(allowedTypes, 4, 3);
  //   return userTeam;
  // }
  
  // createUserCharacter() {
  //   const allowedTypes = [Bowman, Magician, Swordsman];
  //   const randomType = Math.floor(Math.random() * allowedTypes.length);
  //   const userCharacter = new allowedTypes[randomType];
  //   return userCharacter;
  // }

  // createUserPosition() {
  //   const userIndex = [0, 1, 8, 9, 16, 17, 24, 25, 32, 33, 40, 41, 48, 49, 56, 57];
  //   const randomUserIndex = Math.floor(Math.random() * userIndex.length);
  //   return userIndex[randomUserIndex];
  // }

  // createOpponentTeam() {
  //   const allowedTypes = [Daemon, Undead, Vampire];
  //   const opponentTeam = generateTeam(allowedTypes, 4, 3);
  //   return opponentTeam;
  // }

  // createOpponentCharacter() {
  //   const allowedTypes = [Daemon, Undead, Vampire];
  //   const randomType = Math.floor(Math.random() * allowedTypes.length);
  //   const opponentCharacter = new allowedTypes[randomType];
  //   return opponentCharacter;
  // }

  // createOpponentPosition() {
  //   const opponentIndex = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63];
  //   const randomOpponentIndex = Math.floor(Math.random() * opponentIndex.length);
  //   return opponentIndex[randomOpponentIndex];
  // }

  // positioningOfCharacters() {
  //   const user = new PositionedCharacter(this.createUserCharacter(), this.createUserPosition());
  //   const opponent = new PositionedCharacter(this.createOpponentCharacter(), this.createOpponentPosition());
  //   return [user, opponent];
  // }

  generateRandomPosition(characterIndex){
    let idx = characterIndex[Math.floor(Math.random() * characterIndex.length)];
    return idx;
  }

  generateRandomCharacter(characterIndex, characterTypes) {
    let team = generateTeam(characterTypes, 1, 2);
    for (let character of team) {
      this.position.push(new PositionedCharacter(character, this.generateRandomPosition(characterIndex)));
    }
    return this.position;
  }

  onCellClick(index) {
    // TODO: react to click
    const characterClick = this.position.find(elem => elem.position === index);
    if(characterClick){
      const character = characterClick.character;
      if (character.type === "magician" || character.type === "bowman" || character.type === "swordsman") {
        this.gamePlay.selectCell(index);
      }
      else {
        GamePlay.showError('Ошибка. Вы не можете играть этим персонажем.');
      }
    } 
    //this.gamePlay.deselectCell(index);
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
    this.gamePlay.setCursor(cursors.pointer);
    const ICON_LEVEL = '\u{1F396}';
    const ICON_ATTACK = '\u{2694}';
    const ICON_DEFENCE = '\u{1F6E1}';
    const ICON_HEALTH = '\u{2764}';
    const characterEnter = this.position.find(elem => elem.position === index);
    if(characterEnter){
      const character = characterEnter.character;
      const message = `${ICON_LEVEL}${character.level}${ICON_ATTACK}${character.attack}${ICON_DEFENCE}${character.defence}${ICON_HEALTH }${character.health}`;
      this.gamePlay.showCellTooltip(message, index);
    }
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
    this.gamePlay.hideCellTooltip(index);
  }
}
