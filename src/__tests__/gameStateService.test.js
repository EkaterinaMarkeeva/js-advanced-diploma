import GameStateService from '../js/GameStateService';

class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  clear() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
}
// eslint-disable-next-line
global.localStorage = new LocalStorageMock;

test.each([
  [new Error('Invalid state')]
])// eslint-disable-next-line
('testin throws Error GameStateService class load method', (expected) => {
  const stateService = new GameStateService(localStorage);
  JSON.parse = () => {throw new Error('Invalid state')};

  function result() {
    stateService.load();
  }
  expect(result).toThrow(expected);
});
