const fs = require('fs').promises;
const { mkdirp, writeJSON, readJSON, readDirectoryJSON, updateJSON, deleteFile } = require('../lib/file-systems');

jest.mock('fs', () => ({
  promises: {
        
  }
}));
describe('create', () => {
  it('creates an object', () => {
    return; 
  });
});
