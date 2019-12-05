const fs = require('fs').promises;
const { mkdirp, writeJSON, readJSON, readDirectoryJSON, updateJSON, deleteFile } = require('../lib/file-systems');

jest.mock('fs', () => ({
  promises: {
    mkdir: jest.fn(() => Promise.resolve('My File Path')),
    writeFile: jest.fn(() => Promise.resolve()),
    readFile: jest.fn(()=> Promise.resolve(JSON.stringify({ name: 'travis' }))),
    readdir: jest.fn(() => Promise.resolve([
      './name',
      './secondname'
    ])),
    unlink: jest.fn(()=> Promise.resolve()),
  }
}));
describe('mkdirp', () => {
  it('make a directory and all parent directories', () => {
    return mkdirp('/this/is/my/cool/spot')
      .then(()=> {
        expect(fs.mkdir).toHaveBeenLastCalledWith('/this/is/my/cool/spot', {
          recursive: true
        });
          
      });
  });
});
describe('writeJSON', () =>{
  it('write an object to a file', () => {
    return writeJSON('/this/is/my/cool/spot', { name: 'travis' })
      .then(() => {
        expect(fs.writeFile).toHaveBeenLastCalledWith('/this/is/my/cool/spot', '{"name":"travis"}');
      });
  });
});
describe('readJSON', () => {
  it('read a JSON object from a file', () => {
    return readJSON('/this/is/my/cool/spot')
      .then((travis) => {
        expect(fs.readFile).toHaveBeenLastCalledWith('/this/is/my/cool/spot', 'utf8');
        expect(travis).toEqual({ name: 'travis' });
      });
  });
});
describe('readDirectoryJSON', () => {
  it('read all files in a directory as objects', () => {
    return readDirectoryJSON('./this/is/my/cool/spot')
      .then(allItems => {
        expect(fs.readdir).toHaveBeenLastCalledWith('./this/is/my/cool/spot');
        expect(allItems).toEqual([
          { name: 'travis' },
          { name: 'travis' }
        ]);
      });
  });
});
describe('updateJSON', () => {
  it('update a files JSON', () => {
    return updateJSON('./this/is/my/cool/spot', { age: 5 })
      .then(updateItem => {
        expect(fs.readFile).toHaveBeenLastCalledWith('./this/is/my/cool/spot', 'utf8');
        expect(updateItem).toEqual({ name: 'travis', age: 5 });
      });
  });
});
describe('deleteFile', () => {
  it('deletes a file', () => {
    return deleteFile('./this/is/my/cool/spot')
      .then(() => {
        expect(fs.unlink).toHaveBeenLastCalledWith('./this/is/my/cool/spot');
      });
  });
});
