const fs = require('fs').promises;

const mkdirp = (pathstring) => {
  return fs.mkdir(pathstring, { recursive: true });
};

const writeJSON = (obj) => {
  return fs.writeJSON(obj);
};


module.exports = { 
  mkdirp,
};
