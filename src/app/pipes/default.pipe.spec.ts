import { defaultPipe } from './default.pipe';

describe('CurrencyCustomPipe', () => {
  it('create an instance', () => {
    const pipe = new defaultPipe();
    expect(pipe).toBeTruthy();
  });
});
