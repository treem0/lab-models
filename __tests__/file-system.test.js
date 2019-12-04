const fs = require('fs').promises;
const { mkdirp, writeJSON, readJSON } = require('../lib/file-systems');

jest.mock('fs', () => ({
  promises: {
    mkdir: jest.fn(() => Promise.resolve('My File Path')),
    writeFile: jest.fn(() => Promise.resolve()),
    readFile: jest.fn(()=> Promise.resolve(JSON.stringify({ name: 'travis' })))
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
    return writeJSON('/this/is/my/cool/spot', { name: 'travis' })
      .then(() => {
        expect(fs.writeFile).toHaveBeenCalledWith('/this/is/my/cool/spot', '{"name":"travis"}');
      });
  });
});
describe('readJSON', () => {
  it('read a JSON object from a file', () => {
    return readJSON('/this/is/my/cool/spot')
      .then((travis) => {
        expect(fs.readFile).toHaveBeenCalledWith('/this/is/my/cool/spot', 'utf8');
        expect(travis).toEqual({ name: 'travis' });
      });
  });
});
