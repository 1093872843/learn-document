import {sum} from "../utils/index.js"
beforeEach(() => console.log('1 - beforeAll'));
afterEach(() => console.log('1 - afterAll'));
it('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
    console.log('adds 1 + 2 to equal 3');
  });

  test('测试', () => {
    console.log('测试');
    expect(4).toBe(4);
  });