/**
 * Generates random characters
 *
 * @param allowedTypes iterable of classes
 * @param maxLevel max character level
 * @returns Character type children (ex. Magician, Bowman, etc)
 */
import Bowman from './characters/Bowman';
import Daemon from './characters/Daemon';
import Magician from './characters/Magician';
import Swordsman from './characters/Swordsman';
import Undead from './characters/Undead';
import Vampire from './characters/Vampire';
import Team from './Team';

export function* characterGenerator(allowedTypes, maxLevel) {
  // TODO: write logic here
  const randomType = Math.floor(Math.random() * allowedTypes.length);
  const randomLevel = Math.floor(Math.random() * maxLevel) + 1;
  const randomCharacter = new allowedTypes[randomType](randomLevel);
  yield randomCharacter;
}

const allowedTypes = [Bowman, Daemon, Magician, Swordsman, Undead, Vampire];

export function generateTeam(allowedTypes, maxLevel, characterCount) {
  // TODO: write logic here
  const team = [];
  for (let i = 0; i < characterCount; i++) {
    const character = characterGenerator(allowedTypes, maxLevel);
    team.push(character.next().value);
  }
  return team;
}
