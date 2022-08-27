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
    this.characterEnter = -1;
    this.characterClick = -1;
    this.emptyCell = -1;
    this.boardSize = 8;
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
    if (this.characterClick != -1) {
      this.gamePlay.deselectCell(this.characterClick);
    }
    this.characterClick = this.position.find(elem => elem.position === index);
    if (this.characterClick) {
      const character = this.characterClick.character;
      if (character.type === "bowman" || character.type === "magician" || character.type === "swordsman") {
        this.gamePlay.selectCell(index);
        this.characterClick = index;
      }
      if (character.type === "daemon" || character.type === "undead" || character.type === "vampire") {
        GamePlay.showError('Ошибка. Вы не можете играть этим персонажем.');
        this.characterClick = index;
      }
    }
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
    const ICON_LEVEL = '\u{1F396}';
    const ICON_ATTACK = '\u{2694}';
    const ICON_DEFENCE = '\u{1F6E1}';
    const ICON_HEALTH = '\u{2764}';
    if (this.characterEnter != -1) {
      this.gamePlay.setCursor(cursors.auto);
    }
    this.characterEnter = this.position.find(elem => elem.position === index);
    if (this.characterEnter) {
      const character = this.characterEnter.character;
      if (character.type === "bowman" || character.type === "magician" || character.type === "swordsman") {
        this.gamePlay.setCursor(cursors.pointer);
        const message = `${ICON_LEVEL}${character.level}${ICON_ATTACK}${character.attack}${ICON_DEFENCE}${character.defence}${ICON_HEALTH }${character.health}`;
        this.gamePlay.showCellTooltip(message, index);
        this.characterEnter = index;
      }
      if (character.type === "daemon" || character.type === "undead" || character.type === "vampire") {
        this.gamePlay.setCursor(cursors.notallowed);
        this.characterEnter = index;
      }
    }
    this.emptyCell = this.position.find(elem => elem.position != index);
    if (this.emptyCell) {
      if (!this.characterEnter) {
        this.gamePlay.setCursor(cursors.pointer);
        this.gamePlay.selectCell(index, 'green');
        this.emptyCell = index;
      } 
    }
  }

  onMove(distance, player) {
    if (player.character.type === "swordsman" || player.character.type === "undead") {
      this.distance === 4;
    }
    if (player.character.type === "bowman" || player.character.type === "vampire") {
      this.distance === 2;
    }
    if (player.character.type === "magician" || player.character.type === "daemon") {
       this.distance === 1;
    }
  }

  onAttack(distance, player) {
    if (player.character.type === "swordsman" || player.character.type === "undead") {
      this.distance === 1;
    }
    if (player.character.type === "bowman" || player.character.type === "vampire") {
      this.distance === 2;
    }
    if (player.character.type === "magician" || player.character.type === "daemon") {
       this.distance === 4;
    }
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
    this.gamePlay.hideCellTooltip(index);
  }
}
