const fs = require('fs').promises;

const mkdirp = (pathstring) => {
  return fs.mkdir(pathstring, { recursive: true });
};

const writeJSON = (path, input) => {
  const stringifiedInput = JSON.stringify(input);
  return fs.writeFile(path, stringifiedInput);
};

const readJSON = async(file) => {
  const fileContents = await fs.readFile(file, 'utf8');
  return JSON.parse(fileContents);
};

const readDirectoryJSON = async(path) => {
  const fileArray = await fs.readdir(path);
  return Promise.all(fileArray.map(file => readJSON(file)));
};


module.exports = { 
  mkdirp,
  writeJSON,
  readJSON,
  readDirectoryJSON
};
