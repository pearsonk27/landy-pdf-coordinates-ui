import { BlobToInt8arrayPipe } from './blob-to-int8array.pipe';

describe('BlobToInt8arrayPipe', () => {
  it('create an instance', () => {
    const pipe = new BlobToInt8arrayPipe();
    expect(pipe).toBeTruthy();
  });
});
