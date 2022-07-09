import Character from '../Character';
import Daemon from '../characters/Daemon';

test('should throw error', () => {
  expect(() => new Character(1, 'daemon')).toThrow(new Error('Ошибка! Создавать объекты этого класса через new Character(level) запрещено!'));
});

test('should not throw error', () => {
  expect(() => new Daemon(1, 'daemon')).not.toThrow();
});
