export default class Team {
  constructor() {
    this.сharacters = new Set();
  }

  add(сharacter) {
    this.сharacters.add(сharacter);
  }

  addAll(...сharacters) {
    сharacters.forEach((сharacter) => { this.сharacters.add(сharacter); });
  }

  toArray() {
    return Array.from(this.сharacters);
  }
}
