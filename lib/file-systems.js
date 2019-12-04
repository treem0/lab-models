const fs = require('fs').promises;

const mkdirp = (pathstring) => {
  return fs.mkdir(pathstring, { recursive: true });
};

const writeJSON = (path, input) => {
  const stringifiedInput = JSON.stringify(input);
  return fs.writeFile(path, stringifiedInput);
};


module.exports = { 
  mkdirp,
  writeJSON
};
