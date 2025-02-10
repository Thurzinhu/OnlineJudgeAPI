const IDefaultCodeDAO = require("./interfaces/IDefaultCodeDAO");
const DefaultCode = require("../models/DefaultCode");

class DefaultCodeDAO extends IDefaultCodeDAO {
  constructor() {
    super();
  }

  async create(defaultCode) {
    const newDefaultCode = await DefaultCode.create(defaultCode);
    return newDefaultCode;
  }

  async update(id, fields) {}

  async delete(id) {}

  async getById(id) {
    const foundDefaultCode = await DefaultCode.findOne({ _id: id });
    return foundDefaultCode;
  }

  async getByProblem(problemId) {
    const foundDefaultCode = await DefaultCode.findOne({ problem: problemId });
    return foundDefaultCode;
  }

  async getAll() {}
}

module.exports = DefaultCodeDAO;
