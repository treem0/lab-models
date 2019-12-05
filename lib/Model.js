const fs = require('fs').promises;
const { mkdirp, writeJSON, readJSON, readDirectoryJSON, updateJSON, deleteFile } = require('../lib/file-systems');
const uuid = require('uuid/v4');



module.exports = class Model {
  constructor(modelName, modelSchema) {
    this.modelName = modelName;
    mkdirp(`./${modelName}`);
    this.filePath = `./${modelName}`;
    this.itemIds = [];
  }

  create(object) {
    const randomId = uuid();
    this.itemIds.push(randomId);
    return writeJSON(this.filePath + `/${randomId}`, object);
  }

  async findById(modelId) {
    return readJSON(this.filePath + `/${modelId}`);
  }
  async find() {
    return readDirectoryJSON(this.path);
  }

  async findByIdAndUpdate() {
      
  }

  async findByIdAndDelete() {
      
  }

};
