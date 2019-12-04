const fs = require('fs').promises;
const { mkdirp, writeJSON } = require('../lib/file-systems');

jest.mock('fs', () => ({
  promises: {
    mkdir: jest.fn(() => Promise.resolve('My File Path')),
    writeJSON: jest.fn(() => Promise.resolve('{ name: travis }'))
  }
}));
describe('mkdirp', () => {
  it('make a directory and all parent directories', () => {
    return mkdirp('/this/is/my/cool/spot')
      .then(()=> {
        expect(fs.mkdir).toHaveBeenCalledWith('/this/is/my/cool/spot', {
          recursive: true
        });
          
      });
  });
});
describe('writeJSON', () =>{
  it('write an object to a file', () => {
    return writeJSON('{ name: travis }')
      .then(() => {
        expect(fs.writeJSON).toHaveBeenCalledWith('{ name: travis }', {
          recursive: true
        });
      });
  });
});
